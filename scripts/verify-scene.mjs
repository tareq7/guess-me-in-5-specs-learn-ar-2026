import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const file=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const scene=file("Assets/Scene.scene"), controller=file("Assets/Scripts/GuessMeIn5Controller.ts"), meta=file("Assets/Scripts/GuessMeIn5Controller.ts.meta");
const all=scene.split(/\n(?=- !<)/), map=new Map();
for(const text of all){const m=text.match(/^- !<([^/]+)\/([0-9a-f-]{36})>/);if(m){assert(!map.has(m[2]),"Duplicate ID: "+m[2]);map.set(m[2],{type:m[1],text});}}
const find=(name,type)=>{const hits=[...map.values()].filter(x=>x.type===type&&x.text.includes("  Name: "+name+"\n"));assert.equal(hits.length,1,"Expected one "+type+" named "+name);return hits[0].text;};
const obj=name=>find(name,"SceneObject");
for(const n of ["QuizRoot","QuestionGroup","ResultGroup","TitleText","RoundText","QuestionText","AnswerAButton","AnswerBButton","ResultText","ReplayButton"])obj(n);
assert(obj("ResultGroup").includes("  Enabled: false"),"Result card must initially be hidden");
assert(scene.includes("  Name: SpectaclesInteractionKit\n  Enabled: true"),"SIK root disabled");
const ctl=find("GuessMeIn5Controller","ScriptComponent");
assert(ctl.includes("ScriptAsset: !<reference> d7560f8e-9b6e-4a20-a15a-000000000028"));
assert(meta.includes("TypeScriptAsset: !<reference> d7560f8e-9b6e-4a20-a15a-000000000028"));
for(const k of ["questionText","roundText","answerAText","answerBText","resultText","answerA","answerB","replayButton","questionGroup","resultGroup","answerARoot","answerBRoot"])assert(ctl.includes("      "+k+": "),"Missing input "+k);
for(const button of ["AnswerAButton","AnswerBButton","ReplayButton"]){
 const text=obj(button).split("  Components:\n")[1];
 const ids=[...text.matchAll(/    - !<own> ([0-9a-f-]{36})/g)].map(m=>m[1]);
 const types=ids.map(i=>map.get(i));
 assert(types.length===3&&types.every(Boolean),"Bad components "+button);
 assert(types.some(x=>x.type==="Text"));
 assert(types.some(x=>x.type==="ColliderComponent"));
 assert(types.some(x=>x.type==="ScriptComponent"&&x.text.includes("  Name: Interactable\n")));
}
assert(controller.includes(".onTriggerStart.add(") && !controller.includes(".onInteractorTriggerStart"),"Wrong SIK trigger hook");
for(const f of ["GuessMeIn5State.ts.meta","GuessMeIn5Questions.ts.meta"])assert(file("Assets/Scripts/"+f).includes("TypeScriptAssetImporter"));
console.log("Native scene source references OK: 10 objects, 7 Text, 3 Collider, 3 SIK Interactable, 12 controller inputs.");
