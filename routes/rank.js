/**
 * Created by janghunlee on 2017. 8. 16..
 */

module.exports = rank;

function rank(app , wordModel, arraySort){
    "use strict";
    app.get('/rank/week',(req,res)=>{
        wordModel.find({},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    "status":404
                });
            }
            else{
                var arr = new Array();
                for(var i =0; i<model.length; i++){
                    arr[i] = {"rank":model[i]["weekSearch"],"name":model[i]["word"]};
                }
                console.log(typeof(arr));
                console.log(arr);

                var result = arraySort(arr,'rank');
                console.log(result);
                res.send({
                    "status":200,
                    "rank":result
                });
            }
        });
    });

    app.get('/rank/month',(req,res)=>{
        wordModel.find({},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    "status":404
                });
            }
            else{
                var arr = new Array();
                for(var i =0; i<model.length; i++){
                    arr[i] = {"rank":model[i]["monthSearch"],"name":model[i]["word"]};
                }
                console.log(typeof(arr));
                console.log(arr);

                var result = arraySort(arr,'rank');
                console.log(result);
                res.send({
                    "status":200,
                    "rank":result
                });
            }
        });
    });

    app.get('/rank/star',(req,res)=>{
        wordModel.find({},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    "status":404
                });
            }
            else{
                var arr = new Array();
                for(var i =0; i<model.length; i++){
                    arr[i] = {"rank":model[i]["star"],"name":model[i]["word"]};
                }
                console.log(typeof(arr));
                console.log(arr);

                var result = arraySort(arr,'rank');
                console.log(result);
                res.send({
                    "status":200,
                    "rank":result
                });
            }
        });
    });
}