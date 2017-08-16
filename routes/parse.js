/**
 * Created by janghunlee on 2017. 8. 4..
 */

module.exports = parse;

function parse(app, request,shangus,wordModel){
    app.get('/parse/word',(req,res)=> {
        "use strict";
        var word = req.query.word;
        //https://openapi.naver.com/v1/search/encyc.xml

        var requestUrl = "https://openapi.naver.com/v1/search/encyc.xml?"
        requestUrl += "query="+encodeURI(word);
        console.log(requestUrl);
        request({
            headers:{
                'X-Naver-Client-Id':'ofNJExPOBl_tmbgiDIyK',
                'X-Naver-Client-Secret':'oX_BqPhwAL'
            },
            url:requestUrl,
            method:'GET'
        },(err,r,body)=>{
            if(err) throw err;
            console.log(body);
            // var jsonData = shangus.toJson(body);
            var arr = body.replace('</channel>',"").replace('</rss>',"").replace(/&lt;b&gt;/g,"").replace(/&lt;\/b&gt;/g,"").split('<item>');
            var json="";
            for(var i = 1; i<arr.length; i++){
                json+="<item>"+arr[i];
            }
            if(json == ""){
                res.send(404);
            }
            else{
                wordModel.find({"word":word},(err,model)=>{
                   if(err) throw err;

                   if(model.length == 0){
                       var saveWordModel = new wordModel({
                           "word":word,
                           "weekSearch":1,
                           "monthSearch":1,
                           "star":0
                       });

                       saveWordModel.save((error,m)=>{
                          if(error) throw error;
                           res.send({
                               "status":200,
                               "word":json
                           });
                       });
                   }
                   else{
                       var weekSearch = model[0]["weekSearch"] + 1;
                       var monthSearch = model[0]["monthSearch"] + 1;

                       wordModel.update({"word":word},{$set:{"weekSearch":weekSearch,"monthSearch":monthSearch}},(error,m)=>{
                          if(error) throw error;
                          res.send({
                              "status":200,
                              "word":json
                          });
                       });
                   }
                });
            }
        });
    });

    app.get('/parse/translate',(req,res)=>{
        "use strict";
        // ofNJExPOBl_tmbgiDIyK
        // oX_BqPhwAL
        var word = decodeURI(req.query.word);
        console.log(word);
        var url = "https://openapi.naver.com/v1/papago/n2mt";
        console.log(url);
        var options = {
            url: url,
            form: {'source':'ko', 'target':'en', 'text':word},
            headers: {'X-Naver-Client-Id':"ofNJExPOBl_tmbgiDIyK", 'X-Naver-Client-Secret':"oX_BqPhwAL"}
        };
        console.log("option setting");
        request.post(options,(err,response,body)=>{
            if(err)throw err;
            if(response.statusCode == 200){
                var translateWord = JSON.parse(body);
                var resultWord = translateWord["message"]["result"]["translatedText"];
                res.send({
                    "status":200,
                    "word":resultWord
                });
            }
            else{
                res.send({
                    "status":404
                });
            }
        });


    });
}