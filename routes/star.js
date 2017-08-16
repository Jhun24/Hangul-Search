/**
 * Created by janghunlee on 2017. 8. 16..
 */
module.exports = rank;

function rank(app,wordModel) {
    var timer = 0;
    var timer2 = 0;
    "use strict";
    app.get('/rank/star/add',(req,res)=>{
       var word = req.query.word;

       wordModel.find({"word":word},(err,model)=>{
          if(err) throw err;
          if(model.length == 0){
              res.send(403);
          }
          else{
              var num = model[0]["star"] + 1;
              wordModel.update({"word":word},{$set:{"star":num}},(error,m)=>{
                  if(error) throw error;
                  res.send({
                      "status":200,
                      "star":num
                  });
              });
          }
       });
    })

    app.get('/rank/star/minus',(req,res)=>{
        var word = req.query.word;

        wordModel.find({"word":word},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send(403);
            }
            else{
                var num = model[0]["star"] - 1;
                wordModel.update({"word":word},{$set:{"star":num}},(error,m)=>{
                    if(error) throw error;
                    res.send({
                        "status":200,
                        "star":num
                    });
                });
            }
        });
    });

    function initRank(){
        var d = new Date();
        if(d.getDate() == 1 && d.getHours() == 0 && timer == 0){
            timer = 1;
            wordModel.find({},(err,model)=>{
                if(err) throw err;
                for(var i = 0; i < model.length; i++){
                    wordModel.update({"word":model[i]["word"]},{$set:{"monthSearch":"0"}},(error,m)=>{
                       if(error) throw error;
                    });
                }
            });

            console.log("Month Search Update");
        }
        else{
            timer = 0;
        }

        if(d.getDay() == 0 && d.getHours() == 0){
            timer2 = 1;
            wordModel.find({},(err,model)=>{
                if(err) throw err;
                for(var i = 0; i < model.length; i++){
                    wordModel.update({"word":model[i]["word"]},{$set:{"weekSearch":"0"}},(error,m)=>{
                        if(error) throw error;
                    });
                }
            });

            console.log("Weekly Search Update");
        }
        else{
            timer2 = 0;
        }
    }

    setInterval(initRank,1800000);
}
    
