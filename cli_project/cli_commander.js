import fs from 'fs';
import { Command } from 'commander';
const run =new Command();
let c=0;
run
.description("conting words")
run.command('gohul')
    .action(()=>{
        fs.readFile("cli.txt","utf-8",function(err,data)
        {
            if (err)
            {
                console.log(err);
            }
            else
            {
                console.log(data);
                c=data.length;
                let word=0;
                for (let i=0;i<c;i++)
                {
                    if (data[i] != " ")
                    {
                        word+=1;
                    }
                }
                console.log(word);
            }
        });
    });
run.parse();
