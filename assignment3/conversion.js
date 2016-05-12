
  var data='';
  var lines;
  var result=[];
  var theft_over$500=[];
  var theft_under$500=[];
  //var life_expactancy_male=[];

  var arr=[];
  var theft=[];
  var assault=[];
  var flag=true;
  var columns=[];
  var header={};
  var crime=[{'Category':'Index Crime','Total cases':0},{'Category':'Non-Index Crime','Total cases':0}];
  var Category1=['01A','02','03','04A','04B','05','06','07','09'];
  var Category2=['01B','08A','08B','10','11','12','13','14','15','16','17','18','19','20','22','24','26'];
  const readline = require('readline');
  const fs = require('fs');

  const rl = readline.createInterface({
    input: fs.createReadStream('../../crimes.csv')
  });


  rl.on('line', (line) => {
    columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    columns=columns||[];

    if (flag){
      flag=false;

      for (var i=0;i<columns.length;i++){

        header[columns[i]]=i;

      }

    }
    parseCsv(columns);
    //parseForIndia(line);
//console.log(life_expactancy_male);
  }).on ('close',()=>{
    var arr=[];
    sorted_theft=theft.sort(function(a,b){return a.Year - b.Year});
    //sorted_theft_under=theft_under.sort(function(a,b){return a.Year - b.Year});
    sorted_assault=assault.sort(function(a,b){return a.Year - b.Year});
    //var stack_bar={}
    //stack_bar['Male']=life_expactancy_male;
    //stack_bar['Female']=life_expactancy_female;
    //theft['Theft Over $500']=sorted_theft_over;
    //theft['Theft Under $500']=sorted_theft_under;

    fs.writeFile('Theft.json',JSON.stringify(theft,null,2),function(err){
      if(err){
        console.log(err);

      }
      else{
        console.log("Saved");
      }
    });
    fs.writeFile('part3.json',JSON.stringify(crime,null,2),function(err){
      if(err){
        console.log(err);

      }
      else{
        console.log("Saved");
      }
    });
     fs.writeFile('part2.json',JSON.stringify(sorted_assault,null,2),function(err){
       if(err){
         console.log(err);

       }
       else{
         console.log("Saved");
       }
     });

  });




function parseCsv(columns){


    columns=columns||[];
      //console.log(columns);

        if (columns[header['Primary Type']]==="THEFT" && columns[header['Description']]==="$500 AND UNDER"){
          //console.log(columns[0]);

            //console.log(columns[0]);
            var control=false;

            for (var i=0;i<theft.length;i++)
            {
              if(theft[i]['Year']===columns[header['Year']]){
                //console.log("Country matched");

                  //console.log("Updating....");
                  theft[i]['THEFT $500 AND UNDER Cases']+=1;
                  control=true;
                  //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

              }}

              if(!control){

                    theft.push({'Year':columns[header['Year']],'THEFT $500 AND UNDER Cases':1,'THEFT ABOVE $500 Cases':0});
                //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);
                //console.log(life_expactancy_female);

              }

            }
            else{
              if (columns[header['Primary Type']]==="THEFT" && columns[header['Description']]==="OVER $500"){
                //console.log(columns[0]);

                  //console.log(columns[0]);
                  var control=false;

                  for (var i=0;i<theft.length;i++)
                  {
                    if(theft[i]['Year']===columns[header['Year']]){
                      //console.log("Country matched");

                        //console.log("Updating....");
                        theft[i]['THEFT ABOVE $500 Cases']+=1;
                        control=true;
                        //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

                    }}

                    if(!control){

                          theft.push({'Year':columns[header['Year']],'THEFT $500 AND UNDER Cases':0,'THEFT ABOVE $500 Cases':1});
                      //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);
                      //console.log(life_expactancy_female);

                    }

                  }
            }

            if (columns[header['Primary Type']]==="ASSAULT" && columns[header['Arrest']]==="true"){
              //console.log(columns[0]);

                //console.log(columns[0]);
                var control_variable=false;

                for (var i=0;i<assault.length;i++)
                {
                  if(assault[i]['Year']===columns[header['Year']]){
                    //console.log("Country matched");

                      //console.log("Updating....");
                      assault[i]['Arrested']+=1;
                      control_variable=true;
                      //console.log(life_expactancy_female[i]['Value']+"country"+life_expactancy_female[i]['CountryName']);

                  }}

                  if(!control_variable){

                        assault.push({'Year':columns[header['Year']],'Arrested':1,'Not Arrested':0});

                  }

                }
                else{
                  if (columns[header['Primary Type']]==="ASSAULT" && columns[header['Arrest']]==="false"){


                      //console.log(cols[0]);
                      var control=false;

                      for (var i=0;i<assault.length;i++)
                      {
                        if(assault[i]['Year']===columns[header['Year']]){

                            assault[i]['Not Arrested']+=1;
                            control=true;


                        }}

                        if(!control){

                              assault.push({'Year':columns[header['Year']],'Arrested':0,'Not Arrested':1});


                        }

                      }
                }




                    if(Category1.indexOf(columns[header['FBI Code']])>-1){
                      crime[0]['Total cases']+=1;
                      flag=true;

                    }
                    else{
                      if(Category2.indexOf(columns[header['FBI Code']])>-1){
                        crime[1]['Total cases']+=1;
                    }
                  }








                  }
