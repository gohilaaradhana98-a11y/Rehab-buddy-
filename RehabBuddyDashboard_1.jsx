import { useState, useEffect } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const T = {
  bg:"#040D1A",bgCard:"#081728",bgCard2:"#0C1F35",bgHover:"#0F2A45",
  primary:"#00C9A7",primaryDark:"#009E83",secondary:"#4D9FFF",
  accent:"#FF6B6B",gold:"#FFB347",purple:"#A78BFA",pink:"#F472B6",
  text:"#E2EFF9",textMuted:"#7B9DB4",textFaint:"#3D5A73",
  border:"#152A3E",borderLight:"#1E3A52",
  seeking:"#FF9F43",avoiding:"#4ECDC4",sensitivity:"#A78BFA",registration:"#FF6B6B",
  success:"#10B981",warning:"#F59E0B",error:"#EF4444",
};

const CHART_COLORS = { Seeking:"#FF9F43",Avoiding:"#4ECDC4",Sensitivity:"#A78BFA",Registration:"#FF6B6B" };
const BAND_COLORS = {
  "Much Less Than Others":"#EF4444","Less Than Others":"#F59E0B","Just Like Majority":"#10B981","More Than Others":"#4D9FFF","Much More Than Others":"#A78BFA",
  "Much Less":"#EF4444","Less Than":"#F59E0B","Just Like":"#10B981","More Than":"#4D9FFF","Much More":"#A78BFA",
};

const SYSTEM_USERS = [
  {id:"1",email:"dr.sahiba@rehabbuddy.in",password:"Admin@2024",name:"Dr. Sahiba",role:"admin",title:"Clinical Director",initials:"DS"},
  {id:"2",email:"ot@rehabbuddy.in",password:"OT@2024",name:"OT Therapist",role:"therapist",title:"Occupational Therapist",initials:"OT"},
  {id:"3",email:"slp@rehabbuddy.in",password:"SLP@2024",name:"Speech Therapist",role:"therapist",title:"Speech-Language Pathologist",initials:"SL"},
  {id:"4",email:"aba@rehabbuddy.in",password:"ABA@2024",name:"ABA Therapist",role:"therapist",title:"Behavior Analyst",initials:"AB"},
  {id:"5",email:"physio@rehabbuddy.in",password:"PT@2024",name:"Physiotherapist",role:"therapist",title:"Physiotherapist",initials:"PT"},
];

const CSP2_ITEM_TEXTS = {
  1:"Reacts strongly to unexpected or loud noises (sirens, dog barking, hair dryer)",
  2:"Holds hands over ears to protect them from sound",
  3:"Struggles to complete tasks when music or TV is on",
  4:"Is distracted when there is a lot of noise around",
  5:"Becomes unproductive with background noise (fan, refrigerator)",
  6:"Tunes me out or seems to ignore me",
  7:"Seems not to hear when name is called (hearing is OK)",
  8:"Enjoys strange noises or makes noise(s) for fun",
  9:"Prefers to play or work in low lighting",
  10:"Prefers bright colors or patterns for clothing",
  11:"Enjoys looking at visual details in objects",
  12:"Needs help to find objects that are obvious to others",
  13:"Is more bothered by bright lights than other same-aged children",
  14:"Watches people as they move around the room",
  16:"Shows distress during grooming (haircutting, face washing, fingernail cutting)",
  17:"Becomes irritated by wearing shoes or socks",
  18:"Shows an emotional or aggressive response to being touched",
  19:"Becomes anxious when standing close to others (in a line)",
  20:"Rubs or scratches a part of the body that has been touched",
  21:"Touches people or objects to the point of annoying others",
  22:"Displays need to touch toys, surfaces, or textures",
  23:"Seems unaware of pain",
  24:"Seems unaware of temperature changes",
  25:"Touches people and objects more than same-aged children",
  26:"Seems oblivious to messy hands or face",
  27:"Pursues movement to the point it interferes with daily routines (can't sit still, fidgets)",
  28:"Rocks in chair, on floor, or while standing",
  29:"Hesitates going up or down curbs or steps (cautious)",
  30:"Becomes excited during movement tasks",
  31:"Takes movement or climbing risks that are unsafe",
  32:"Looks for opportunities to fall with no regard for own safety",
  33:"Loses balance unexpectedly when walking on uneven surface",
  34:"Bumps into things, failing to notice objects or people in the way",
  35:"Moves stiffly",
  36:"Becomes tired easily, especially when standing or holding the body in one position",
  37:"Seems to have weak muscles",
  38:"Props to support self (holds head in hands, leans against a wall)",
  39:"Clings to objects, walls, or banisters more than same-aged children",
  40:"Walks loudly as if feet are heavy",
  41:"Drapes self over furniture or on other people",
  42:"Needs heavy blankets to sleep",
  43:"Gags easily from certain food textures or food utensils in mouth",
  44:"Rejects certain tastes or food smells that are typically part of children's diets",
  45:"Eats only certain tastes (e.g., sweet, salty)",
  46:"Limits self to certain food textures",
  47:"Is a picky eater, especially about food textures",
  48:"Smells nonfood objects",
  49:"Shows a strong preference for certain tastes",
  50:"Craves certain foods, tastes, or smells",
  51:"Puts objects in mouth (e.g., pencil, hands)",
  52:"Bites tongue or lips more than same-aged children",
  53:"Seems accident-prone",
  54:"Rushes through coloring, writing, or drawing",
  55:"Takes excessive risks (e.g., climbs high into a tree, jumps off tall furniture)",
  56:"Seems more active than same-aged children",
  57:"Does things in a harder way than is needed (wastes time, moves slowly)",
  58:"Can be stubborn and uncooperative",
  59:"Has temper tantrums",
  60:"Appears to enjoy falling",
  61:"Resists eye contact from me or others",
  62:"Seems to have low self-esteem (difficulty liking self)",
  63:"Needs positive support to return to challenging situations",
  64:"Is sensitive to criticisms",
  65:"Has definite, predictable fears",
  66:"Expresses feeling like a failure",
  67:"Is too serious",
  68:"Has strong emotional outbursts when unable to complete a task",
  69:"Struggles to interpret body language or facial expression",
  70:"Gets frustrated easily",
  71:"Has fears that interfere with daily routines",
  72:"Is distressed by changes in plans, routines, or expectations",
  73:"Needs more protection from life than same-aged children",
  74:"Interacts or participates in groups less than same-aged children",
  75:"Has difficulty with friendships (making or keeping friends)",
  76:"Misses eye contact with me during everyday interactions",
  77:"Struggles to pay attention",
  78:"Looks away from tasks to notice all actions in the room",
  79:"Seems oblivious within an active environment (unaware of activity)",
  80:"Stares intensively at objects",
  81:"Stares intensively at people",
  82:"Watches everyone when they move around the room",
  83:"Jumps from one thing to another so that it interferes with activities",
  84:"Gets lost easily",
  85:"Has a hard time finding objects in competing backgrounds",
};

const CSP2_CHILD_ITEMS = [
  {id:1,domain:"AUDITORY",q:"AV"},{id:2,domain:"AUDITORY",q:"AV"},{id:3,domain:"AUDITORY",q:"SN"},
  {id:4,domain:"AUDITORY",q:"SN"},{id:5,domain:"AUDITORY",q:"AV"},{id:6,domain:"AUDITORY",q:"SN"},
  {id:7,domain:"AUDITORY",q:"SN"},{id:8,domain:"AUDITORY",q:"RG"},
  {id:9,domain:"VISUAL",q:"SN"},{id:10,domain:"VISUAL",q:null},{id:11,domain:"VISUAL",q:null},
  {id:12,domain:"VISUAL",q:"RG"},{id:13,domain:"VISUAL",q:"SN"},{id:14,domain:"VISUAL",q:"SK"},
  {id:16,domain:"TOUCH",q:"SN"},{id:17,domain:"TOUCH",q:null},{id:18,domain:"TOUCH",q:"AV"},
  {id:19,domain:"TOUCH",q:"SN"},{id:20,domain:"TOUCH",q:"SN"},{id:21,domain:"TOUCH",q:"SK"},
  {id:22,domain:"TOUCH",q:"SK"},{id:23,domain:"TOUCH",q:"RG"},{id:24,domain:"TOUCH",q:"RG"},
  {id:25,domain:"TOUCH",q:"SK"},{id:26,domain:"TOUCH",q:"RG"},
  {id:27,domain:"MOVEMENT",q:"SK"},{id:28,domain:"MOVEMENT",q:"SK"},{id:29,domain:"MOVEMENT",q:null},
  {id:30,domain:"MOVEMENT",q:"SK"},{id:31,domain:"MOVEMENT",q:"SK"},{id:32,domain:"MOVEMENT",q:"SK"},
  {id:33,domain:"MOVEMENT",q:"RG"},{id:34,domain:"MOVEMENT",q:"RG"},
  {id:35,domain:"BODY POSITION",q:"RG"},{id:36,domain:"BODY POSITION",q:"RG"},{id:37,domain:"BODY POSITION",q:"RG"},
  {id:38,domain:"BODY POSITION",q:"RG"},{id:39,domain:"BODY POSITION",q:"RG"},{id:40,domain:"BODY POSITION",q:"RG"},
  {id:41,domain:"BODY POSITION",q:"SK"},{id:42,domain:"BODY POSITION",q:null},
  {id:43,domain:"ORAL SENSORY",q:null},{id:44,domain:"ORAL SENSORY",q:"SN"},{id:45,domain:"ORAL SENSORY",q:"SN"},
  {id:46,domain:"ORAL SENSORY",q:"SN"},{id:47,domain:"ORAL SENSORY",q:"SN"},{id:48,domain:"ORAL SENSORY",q:"SK"},
  {id:49,domain:"ORAL SENSORY",q:"SK"},{id:50,domain:"ORAL SENSORY",q:"SK"},{id:51,domain:"ORAL SENSORY",q:"SK"},
  {id:52,domain:"ORAL SENSORY",q:"SN"},
  {id:53,domain:"CONDUCT",q:"RG"},{id:54,domain:"CONDUCT",q:"RG"},{id:55,domain:"CONDUCT",q:"SK"},
  {id:56,domain:"CONDUCT",q:"SK"},{id:57,domain:"CONDUCT",q:"RG"},{id:58,domain:"CONDUCT",q:"AV"},
  {id:59,domain:"CONDUCT",q:"AV"},{id:60,domain:"CONDUCT",q:"SK"},{id:61,domain:"CONDUCT",q:"AV"},
  {id:62,domain:"SOCIAL EMOTIONAL",q:"RG"},{id:63,domain:"SOCIAL EMOTIONAL",q:"AV"},{id:64,domain:"SOCIAL EMOTIONAL",q:"AV"},
  {id:65,domain:"SOCIAL EMOTIONAL",q:"AV"},{id:66,domain:"SOCIAL EMOTIONAL",q:"AV"},{id:67,domain:"SOCIAL EMOTIONAL",q:"AV"},
  {id:68,domain:"SOCIAL EMOTIONAL",q:"AV"},{id:69,domain:"SOCIAL EMOTIONAL",q:"SN"},{id:70,domain:"SOCIAL EMOTIONAL",q:"AV"},
  {id:71,domain:"SOCIAL EMOTIONAL",q:"AV"},{id:72,domain:"SOCIAL EMOTIONAL",q:"AV"},{id:73,domain:"SOCIAL EMOTIONAL",q:"SN"},
  {id:74,domain:"SOCIAL EMOTIONAL",q:"AV"},{id:75,domain:"SOCIAL EMOTIONAL",q:"AV"},
  {id:76,domain:"ATTENTIONAL",q:"RG"},{id:77,domain:"ATTENTIONAL",q:"SN"},{id:78,domain:"ATTENTIONAL",q:"SN"},
  {id:79,domain:"ATTENTIONAL",q:"RG"},{id:80,domain:"ATTENTIONAL",q:"RG"},{id:81,domain:"ATTENTIONAL",q:"AV"},
  {id:82,domain:"ATTENTIONAL",q:"SK"},{id:83,domain:"ATTENTIONAL",q:"SK"},{id:84,domain:"ATTENTIONAL",q:"SN"},
  {id:85,domain:"ATTENTIONAL",q:"RG"},
];

const CSP2_Q_ITEMS = {
  Seeking:[14,21,22,25,27,28,30,31,32,41,48,49,50,51,55,56,60,82,83],
  Avoiding:[1,2,5,18,58,59,61,63,64,65,66,67,68,70,71,72,74,75,81],
  Sensitivity:[3,4,6,7,9,13,16,19,20,44,45,46,47,52,69,73,77,78,84],
  Registration:[8,12,23,24,26,33,34,35,36,37,38,39,40,53,54,57,62,76,79,80,85],
};

const CSP2_EXCLUDED = [15,43,86];

const CSP2_BANDS = {
  Q:{
    Seeking:{max:95,b:[["Much Less Than Others",[0,6]],["Less Than Others",[7,19]],["Just Like Majority",[20,47]],["More Than Others",[48,60]],["Much More Than Others",[61,95]]]},
    Avoiding:{max:100,b:[["Much Less Than Others",[0,7]],["Less Than Others",[8,20]],["Just Like Majority",[21,46]],["More Than Others",[47,59]],["Much More Than Others",[60,100]]]},
    Sensitivity:{max:95,b:[["Much Less Than Others",[0,6]],["Less Than Others",[7,17]],["Just Like Majority",[18,42]],["More Than Others",[43,53]],["Much More Than Others",[54,95]]]},
    Registration:{max:110,b:[["Much Less Than Others",[0,6]],["Less Than Others",[7,18]],["Just Like Majority",[19,43]],["More Than Others",[44,55]],["Much More Than Others",[56,110]]]},
  },
  D:{
    "AUDITORY":{max:40,b:[["Much Less",[0,2]],["Less Than",[3,9]],["Just Like",[10,24]],["More Than",[25,31]],["Much More",[32,40]]]},
    "VISUAL":{max:30,b:[["Much Less",[0,4]],["Less Than",[5,8]],["Just Like",[9,17]],["More Than",[18,21]],["Much More",[22,30]]]},
    "TOUCH":{max:55,b:[["Much Less",[0,0]],["Less Than",[1,7]],["Just Like",[8,21]],["More Than",[22,28]],["Much More",[29,55]]]},
    "MOVEMENT":{max:40,b:[["Much Less",[0,1]],["Less Than",[2,6]],["Just Like",[7,18]],["More Than",[19,24]],["Much More",[25,40]]]},
    "BODY POSITION":{max:40,b:[["Much Less",[0,0]],["Less Than",[1,4]],["Just Like",[5,15]],["More Than",[16,19]],["Much More",[20,40]]]},
    "ORAL SENSORY":{max:50,b:[["Much Less",[0,0]],["Less Than",[0,7]],["Just Like",[8,24]],["More Than",[25,32]],["Much More",[33,50]]]},
    "CONDUCT":{max:45,b:[["Much Less",[0,1]],["Less Than",[2,8]],["Just Like",[9,22]],["More Than",[23,29]],["Much More",[30,45]]]},
    "SOCIAL EMOTIONAL":{max:70,b:[["Much Less",[0,2]],["Less Than",[3,12]],["Just Like",[13,31]],["More Than",[32,41]],["Much More",[42,70]]]},
    "ATTENTIONAL":{max:50,b:[["Much Less",[0,0]],["Less Than",[1,8]],["Just Like",[9,24]],["More Than",[25,31]],["Much More",[32,50]]]},
  }
};

const VAND_ITEMS = [
  {id:1,ss:"ADHD-I",t:"Does not pay attention to details or makes careless mistakes (e.g., homework)"},
  {id:2,ss:"ADHD-I",t:"Has difficulty keeping attention to what needs to be done"},
  {id:3,ss:"ADHD-I",t:"Does not seem to listen when spoken to directly"},
  {id:4,ss:"ADHD-I",t:"Does not follow through; fails to finish activities"},
  {id:5,ss:"ADHD-I",t:"Has difficulty organizing tasks and activities"},
  {id:6,ss:"ADHD-I",t:"Avoids tasks requiring ongoing mental effort"},
  {id:7,ss:"ADHD-I",t:"Loses things necessary for tasks (toys, assignments, pencils, books)"},
  {id:8,ss:"ADHD-I",t:"Is easily distracted by noises or other stimuli"},
  {id:9,ss:"ADHD-I",t:"Is forgetful in daily activities"},
  {id:10,ss:"ADHD-H",t:"Fidgets with hands or feet or squirms in seat"},
  {id:11,ss:"ADHD-H",t:"Leaves seat when remaining seated is expected"},
  {id:12,ss:"ADHD-H",t:"Runs about or climbs too much when remaining seated is expected"},
  {id:13,ss:"ADHD-H",t:"Has difficulty playing or beginning quiet play games"},
  {id:14,ss:"ADHD-H",t:"Is 'on the go' or often acts as if 'driven by a motor'"},
  {id:15,ss:"ADHD-H",t:"Talks too much"},
  {id:16,ss:"ADHD-H",t:"Blurts out answers before questions have been completed"},
  {id:17,ss:"ADHD-H",t:"Has difficulty waiting his or her turn"},
  {id:18,ss:"ADHD-H",t:"Interrupts or intrudes in on others' conversations and/or activities"},
  {id:19,ss:"ODD",t:"Argues with adults"},
  {id:20,ss:"ODD",t:"Loses temper"},
  {id:21,ss:"ODD",t:"Actively defies or refuses to go along with adults' requests or rules"},
  {id:22,ss:"ODD",t:"Deliberately annoys people"},
  {id:23,ss:"ODD",t:"Blames others for his or her mistakes or misbehaviors"},
  {id:24,ss:"ODD",t:"Is touchy or easily annoyed by others"},
  {id:25,ss:"ODD",t:"Is angry or resentful"},
  {id:26,ss:"ODD",t:"Is spiteful and wants to get even"},
  {id:41,ss:"ANXIETY",t:"Is fearful, anxious, or worried"},
  {id:42,ss:"ANXIETY",t:"Is afraid to try new things for fear of making mistakes"},
  {id:43,ss:"ANXIETY",t:"Feels worthless or inferior"},
  {id:44,ss:"ANXIETY",t:"Blames self for problems, feels guilty"},
  {id:45,ss:"ANXIETY",t:"Feels lonely, unwanted, or unloved"},
  {id:46,ss:"ANXIETY",t:"Is sad, unhappy, or depressed"},
  {id:47,ss:"ANXIETY",t:"Is self-conscious or easily embarrassed"},
];

const DST_ITEMS = [
  {id:1,ag:"0-3m",t:"Birth cry present",dom:"Motor"},{id:2,ag:"0-3m",t:"Equal bilateral movements",dom:"Motor"},
  {id:3,ag:"0-3m",t:"Responds to bell",dom:"Language"},{id:4,ag:"0-3m",t:"Vocalizes sounds",dom:"Language"},
  {id:5,ag:"0-3m",t:"Smiles spontaneously",dom:"Social"},{id:6,ag:"0-3m",t:"Eyes follow moving objects",dom:"Motor"},
  {id:7,ag:"0-3m",t:"Head steady",dom:"Motor"},
  {id:8,ag:"4-6m",t:"Reaches for objects",dom:"Motor"},{id:9,ag:"4-6m",t:"Laughs aloud",dom:"Social"},
  {id:10,ag:"4-6m",t:"Recognizes mother",dom:"Social"},{id:11,ag:"4-6m",t:"Babbles/vocalizes for pleasure",dom:"Language"},
  {id:12,ag:"4-6m",t:"Carries objects to mouth",dom:"Motor"},{id:13,ag:"4-6m",t:"Rolls over",dom:"Motor"},
  {id:14,ag:"7-9m",t:"Imitates speech sounds",dom:"Language"},{id:15,ag:"7-9m",t:"Sits by self",dom:"Motor"},
  {id:16,ag:"7-9m",t:"Thumb-finger grasp",dom:"Motor"},{id:17,ag:"7-9m",t:"Shows curiosity",dom:"Cognitive"},
  {id:18,ag:"9-12m",t:"Says 3 words (dada/mama)",dom:"Language"},{id:19,ag:"9-12m",t:"Stands alone well",dom:"Motor"},
  {id:20,ag:"9-12m",t:"Follows simple instructions",dom:"Cognitive"},{id:21,ag:"9-12m",t:"Cooperates for dressing",dom:"Self-care"},
  {id:22,ag:"12-18m",t:"Many intelligible words",dom:"Language"},{id:23,ag:"12-18m",t:"Walks and runs well",dom:"Motor"},
  {id:24,ag:"12-18m",t:"Indicates wants",dom:"Social"},{id:25,ag:"12-18m",t:"Scribbles spontaneously",dom:"Motor"},
  {id:26,ag:"18-24m",t:"Says 2-3 word sentences",dom:"Language"},{id:27,ag:"18-24m",t:"Points out objects in pictures",dom:"Cognitive"},
  {id:28,ag:"18-24m",t:"Shows body parts",dom:"Cognitive"},{id:29,ag:"18-24m",t:"Participates in play",dom:"Social"},
  {id:30,ag:"2-3y",t:"Copies 'O'",dom:"Motor"},{id:31,ag:"2-3y",t:"Relates experiences",dom:"Language"},
  {id:32,ag:"2-3y",t:"Knows names & uses of common objects",dom:"Cognitive"},{id:33,ag:"2-3y",t:"Begins to ask 'why'?",dom:"Cognitive"},
  {id:34,ag:"2-3y",t:"Takes food by self",dom:"Self-care"},{id:35,ag:"2-3y",t:"Toilet control present",dom:"Self-care"},
  {id:36,ag:"3-4y",t:"Buttons up",dom:"Self-care"},{id:37,ag:"3-4y",t:"Comprehends 'hunger', 'cold'",dom:"Cognitive"},
  {id:38,ag:"3-4y",t:"Plays cooperatively with other children",dom:"Social"},{id:39,ag:"3-4y",t:"Repeats 3 digits",dom:"Cognitive"},
  {id:40,ag:"4-5y",t:"Defines words",dom:"Language"},{id:41,ag:"4-5y",t:"Makes simple drawing",dom:"Motor"},
  {id:42,ag:"4-5y",t:"Dresses with no supervision",dom:"Self-care"},{id:43,ag:"4-5y",t:"Gives sensible answers to questions",dom:"Cognitive"},
  {id:44,ag:"5-6y",t:"Names primary colors",dom:"Cognitive"},{id:45,ag:"5-6y",t:"Plays games governed by rules",dom:"Social"},
  {id:46,ag:"5-6y",t:"Writes simple words",dom:"Motor"},{id:47,ag:"5-6y",t:"Gains admission to school",dom:"Social"},
  {id:48,ag:"6-7y",t:"Adapts to home and school",dom:"Social"},{id:49,ag:"6-7y",t:"Spells, reads, writes simple words",dom:"Cognitive"},
  {id:50,ag:"7-8y",t:"Combs hair by self",dom:"Self-care"},{id:51,ag:"7-8y",t:"Tells time",dom:"Cognitive"},
];

const DST_AGE_GROUPS = ["0-3m","4-6m","7-9m","9-12m","12-18m","18-24m","2-3y","3-4y","4-5y","5-6y","6-7y","7-8y"];

const VSMS_ITEMS = [
  {id:1,ag:"0-1y",t:"Crows/Laughs",v:0.7},{id:2,ag:"0-1y",t:"Balance head",v:1.4},
  {id:3,ag:"0-1y",t:"Grasps objects within reach",v:2.1},{id:5,ag:"0-1y",t:"Rolls over (unassisted)",v:3.5},
  {id:8,ag:"0-1y",t:"Sits unsupported",v:5.6},{id:11,ag:"0-1y",t:"Drinks from cup (assisted)",v:7.7},
  {id:12,ag:"0-1y",t:"Moves about on floor (creeping/crawling)",v:8.4},{id:15,ag:"0-1y",t:"Stands alone",v:10.6},
  {id:16,ag:"0-1y",t:"Does not drool",v:11.3},{id:17,ag:"0-1y",t:"Follows simple instructions",v:12.0},
  {id:18,ag:"1-2y",t:"Walks about room unattended",v:12.7},{id:20,ag:"1-2y",t:"Masticates solid/semi-solid food",v:14.1},
  {id:22,ag:"1-2y",t:"Transfers objects purposefully",v:15.5},{id:25,ag:"1-2y",t:"Drinks from cup unassisted",v:17.6},
  {id:26,ag:"1-2y",t:"Walks without support",v:18.3},{id:28,ag:"1-2y",t:"Eats with own hands",v:19.7},
  {id:31,ag:"1-2y",t:"Uses names of familiar objects",v:21.9},{id:34,ag:"1-2y",t:"Talks in short sentences",v:24.0},
  {id:35,ag:"2-3y",t:"Signals to go to toilet",v:25.2},{id:36,ag:"2-3y",t:"Initiates own play activities",v:26.4},
  {id:38,ag:"2-3y",t:"Eats with spoon",v:28.8},{id:40,ag:"2-3y",t:"Dries own hands",v:31.2},
  {id:42,ag:"2-3y",t:"Puts on shirt/frock unassisted",v:33.6},{id:44,ag:"2-3y",t:"Relates experience",v:36.0},
  {id:45,ag:"3-4y",t:"Walks downstairs (one step at a time)",v:38.0},{id:46,ag:"3-4y",t:"Plays cooperatively",v:40.0},
  {id:47,ag:"3-4y",t:"Buttons shirt or frock",v:42.0},{id:50,ag:"3-4y",t:"Washes hands unaided",v:48.0},
  {id:51,ag:"4-5y",t:"Cares for self at toilet",v:50.0},{id:52,ag:"4-5y",t:"Washes face unassisted",v:52.0},
  {id:54,ag:"4-5y",t:"Dresses self except for tying",v:56.0},{id:56,ag:"4-5y",t:"Plays competitive exercise games",v:60.0},
  {id:58,ag:"5-6y",t:"Prints (writes) simple words",v:64.8},{id:59,ag:"5-6y",t:"Plays simple games requiring turns",v:67.2},
  {id:61,ag:"5-6y",t:"Goes to school unattended",v:72.0},{id:63,ag:"6-7y",t:"Uses pencil for writing",v:78.0},
  {id:65,ag:"6-7y",t:"Goes to bed unassisted",v:84.0},{id:70,ag:"7-8y",t:"Combs/brushes hair",v:96.0},
];
const VSMS_AGE_GROUPS = ["0-1y","1-2y","2-3y","3-4y","4-5y","5-6y","6-7y","7-8y"];

const PRIM_REFLEXES = [
  {id:"moro",name:"Moro Reflex",int:"4-6 months",impact:"Anxiety, sensory oversensitivity, poor concentration",test:"Sudden head position change or loud noise"},
  {id:"atnr",name:"ATNR (Asymmetrical Tonic Neck)",int:"6 months",impact:"Reading/writing difficulties, mixed laterality, poor hand-eye coordination",test:"Turn head to one side — arm/leg on same side extend"},
  {id:"stnr",name:"STNR (Symmetrical Tonic Neck)",int:"9-11 months",impact:"Poor sitting posture, difficulty crawling, W-sitting",test:"Head flexion/extension changes arm-leg tone"},
  {id:"tlr",name:"TLR (Tonic Labyrinthine)",int:"6m-3 years",impact:"Balance issues, poor muscle tone, motion sickness",test:"Head position in space changes whole body tone"},
  {id:"palmar",name:"Palmar Grasp",int:"5-6 months",impact:"Poor pencil grip, articulation difficulties, drooling",test:"Stroke palm — finger flexion/grip reflex"},
  {id:"plantar",name:"Plantar Grasp",int:"9-12 months",impact:"Poor balance, toe walking",test:"Stroke sole — toe flexion reflex"},
  {id:"rooting",name:"Rooting Reflex",int:"4-6 months",impact:"Hypersensitivity around mouth, articulation difficulties",test:"Stroke near mouth — head turn toward stimulus"},
  {id:"galant",name:"Spinal Galant",int:"9 months",impact:"Bedwetting, poor concentration, sensitivity to waist pressure",test:"Stroke one side of back — hip swings toward stimulus"},
  {id:"landau",name:"Landau Reflex",int:"21-24 months",impact:"Poor muscle tone, balance issues",test:"Prone suspension — back arching, extension pattern"},
  {id:"parachute",name:"Parachute Reflex",int:"Should EMERGE 8-9 months",impact:"Risk of falls, absent = developmental concern",test:"Forward tipping — arm extension to protect"},
  {id:"babinski",name:"Babinski Reflex",int:"12-24 months",impact:"Neurological concern if retained beyond 2 years",test:"Stroke lateral sole — toe fanning (up-going)"},
  {id:"fear_paralysis",name:"Fear Paralysis",int:"Before birth",impact:"Anxiety, selective mutism, extreme shyness, freeze response",test:"Sudden overwhelm — freeze/shut-down response"},
];

const NICRCA_DOMAINS = [
  {id:"bio",name:"Biology & Regulation",color:T.primary,icon:"◉",desc:"Sensory regulation, routine, social exposure, sleep & gut",
    items:[{id:"bio1",t:"Child maintains appropriate sensory regulation throughout the day"},{id:"bio2",t:"Child adheres to a predictable daily routine and schedule"},{id:"bio3",t:"Child tolerates age-appropriate social exposure without significant distress"},{id:"bio4",t:"Child has consistent and adequate sleep patterns"},{id:"bio5",t:"Child demonstrates healthy gut function and oral feeding patterns"},{id:"bio6",t:"Child can self-regulate following sensory overload within reasonable time"},{id:"bio7",t:"Screen time is within recommended limits and well-managed"}]},
  {id:"phys",name:"Physical Development",color:T.gold,icon:"◈",desc:"Gross/fine motor, motor planning, posture, tone & gait",
    items:[{id:"phys1",t:"Gross motor skills are age-appropriate (running, jumping, climbing)"},{id:"phys2",t:"Fine motor skills are age-appropriate (grip, manipulation, pinch)"},{id:"phys3",t:"Motor planning: ability to sequence new motor tasks (praxis)"},{id:"phys4",t:"Postural control and muscle tone are functional for age-level activities"},{id:"phys5",t:"Gait pattern is mature, efficient, and age-appropriate"},{id:"phys6",t:"Child follows 1-2 step motor commands during structured activities"},{id:"phys7",t:"Bilateral coordination is functional for age-level tasks"}]},
  {id:"adl",name:"ADL / Self-Care",color:T.success,icon:"◇",desc:"Toilet training, BADL & IADL independence",
    items:[{id:"adl1",t:"Toilet training is complete and appropriate for chronological age"},{id:"adl2",t:"Independent dressing and undressing (with minimal assistance)"},{id:"adl3",t:"Feeding: uses appropriate utensils independently for meals"},{id:"adl4",t:"Hygiene routines (bathing, teeth brushing, hair care) with minimal assistance"},{id:"adl5",t:"Basic safety awareness in familiar and unfamiliar environments"},{id:"adl6",t:"Age-appropriate household participation and instrumental ADL"}]},
  {id:"lang",name:"Language & Communication",color:T.purple,icon:"◔",desc:"Oral motor, speech/sound production & social language",
    items:[{id:"lang1",t:"Oral motor function adequately supports speech production and feeding"},{id:"lang2",t:"Speech sound production is intelligible and age-appropriate"},{id:"lang3",t:"Expressive language (vocabulary, sentences) meets age expectations"},{id:"lang4",t:"Receptive language (comprehension, following directions) meets age expectations"},{id:"lang5",t:"Social language / pragmatics are functional in peer and adult interactions"},{id:"lang6",t:"Child initiates communication spontaneously in multiple contexts"},{id:"lang7",t:"Child uses AAC or compensatory strategies where indicated"}]},
  {id:"soc",name:"Social & Emotional",color:T.accent,icon:"◑",desc:"Social skills, emotional regulation & peer relationships",
    items:[{id:"soc1",t:"Joint attention skills are established and functional"},{id:"soc2",t:"Child engages in reciprocal play with peers"},{id:"soc3",t:"Emotional regulation is age-appropriate"},{id:"soc4",t:"Child responds appropriately to social cues from peers and adults"},{id:"soc5",t:"Child demonstrates empathy and beginning perspective-taking"},{id:"soc6",t:"Transitions between activities and settings without significant distress"}]},
  {id:"cog",name:"Cognitive",color:T.secondary,icon:"◐",desc:"Attention, memory, problem-solving & executive function",
    items:[{id:"cog1",t:"Sustained attention meets age expectations for structured tasks"},{id:"cog2",t:"Working memory is functional for learning and instruction-following"},{id:"cog3",t:"Problem-solving skills are emerging/age-appropriate"},{id:"cog4",t:"Child follows multi-step instructions reliably"},{id:"cog5",t:"Executive function: planning, cognitive flexibility, and inhibitory control"},{id:"cog6",t:"Cognitive flexibility (manages transitions, changes in routine)"}]},
  {id:"acad",name:"Academic",color:T.warning,icon:"◍",desc:"Pre-academic, reading, writing & mathematics",
    items:[{id:"acad1",t:"Pre-academic skills are in place (if preschool age)"},{id:"acad2",t:"Reading skills meet grade/age expectations"},{id:"acad3",t:"Writing skills meet grade/age expectations"},{id:"acad4",t:"Mathematics skills meet grade/age expectations"},{id:"acad5",t:"Child participates appropriately in classroom and group learning"},{id:"acad6",t:"Homework and academic tasks completed with age-appropriate independence"}]},
];

const NICRCA_OPTIONS = [
  {v:4,l:"Age-appropriate / Functional"},{v:3,l:"Mild Difficulty / Emerging"},
  {v:2,l:"Moderate Difficulty"},{v:1,l:"Significant Difficulty"},{v:0,l:"Not yet present / Cannot assess"},
];

function classifyBand(score,bands){for(const[label,[lo,hi]]of bands){if(score>=lo&&score<=hi)return label;}return"—";}

function scoreCSP2(r){
  const DOMS=["AUDITORY","VISUAL","TOUCH","MOVEMENT","BODY POSITION","ORAL SENSORY","CONDUCT","SOCIAL EMOTIONAL","ATTENTIONAL"];
  const ds={},dc={};
  DOMS.forEach(d=>{
    const its=CSP2_CHILD_ITEMS.filter(i=>i.domain===d&&!CSP2_EXCLUDED.includes(i.id));
    const score=its.reduce((s,i)=>s+(r[i.id]||0),0);
    ds[d]=score;
    if(CSP2_BANDS.D[d])dc[d]=classifyBand(score,CSP2_BANDS.D[d].b);
  });
  const qs={},qc={};
  Object.entries(CSP2_Q_ITEMS).forEach(([q,ids])=>{
    const score=ids.reduce((s,id)=>s+(r[id]||0),0);
    qs[q]=score;
    if(CSP2_BANDS.Q[q])qc[q]=classifyBand(score,CSP2_BANDS.Q[q].b);
  });
  return{domainScores:ds,quadrantScores:qs,domainClassifications:dc,quadrantClassifications:qc};
}

function scoreVanderbilt(r){
  const iIds=[1,2,3,4,5,6,7,8,9],hIds=[10,11,12,13,14,15,16,17,18];
  const oIds=[19,20,21,22,23,24,25,26],aIds=[41,42,43,44,45,46,47];
  const count=(ids)=>ids.filter(id=>(r[id]||0)>=2).length;
  const sum=(ids)=>ids.reduce((s,id)=>s+(r[id]||0),0);
  const ip=count(iIds),hp=count(hIds),op=count(oIds);
  let type="No Positive Screen";
  if(ip>=6&&hp>=6)type="ADHD — Combined Type";
  else if(ip>=6)type="ADHD — Predominantly Inattentive";
  else if(hp>=6)type="ADHD — Predominantly Hyperactive-Impulsive";
  return{inattentionCount:ip,hyperactiveCount:hp,oddCount:op,inattentionScore:sum(iIds),hyperactiveScore:sum(hIds),oddScore:sum(oIds),anxietyScore:sum(aIds),adhdType:type,oddPositive:op>=4,anxietyPositive:count(aIds)>=3};
}

function scoreDST(p){const total=DST_ITEMS.length;const pc=Object.values(p).filter(Boolean).length;return{passedCount:pc,total,percentage:Math.round((pc/total)*100)};}

function scoreVSMS(p,caMo){
  let m=0;VSMS_ITEMS.forEach(i=>{if(p[i.id]===true)m+=i.v;else if(p[i.id]===0.5)m+=i.v*0.5;});
  const sq=caMo>0?Math.round((m/caMo)*100):0;
  return{socialAgeMonths:Math.round(m),socialQuotient:sq};
}

function scoreNICRCA(r){
  const ds={};
  NICRCA_DOMAINS.forEach(d=>{
    const max=d.items.length*4;
    const score=d.items.reduce((s,i)=>s+(r[i.id]??2),0);
    const pct=Math.round((score/max)*100);
    let level="Functional";
    if(pct<50)level="Significant Concern";else if(pct<65)level="Moderate Concern";else if(pct<80)level="Mild Concern";
    ds[d.id]={score,maxScore:max,pct,level};
  });
  return ds;
}

function generateGoals(scores){
  const goals=[];
  const{csp2,vanderbilt,nicrca,primitiveReflexes}=scores;
  if(csp2){
    const{quadrantClassifications:qc,domainClassifications:dc}=csp2;
    if(qc.Seeking==="More Than Others"||qc.Seeking==="Much More Than Others")goals.push({domain:"Sensory Regulation",area:"sensory seeking",goal:"Child will engage in appropriate sensory-seeking activities through a scheduled sensory diet without disrupting classroom/home routines in 4/5 opportunities",service:"OT",priority:"High"});
    if(qc.Avoiding==="More Than Others"||qc.Avoiding==="Much More Than Others")goals.push({domain:"Sensory Regulation",area:"sensory avoidance",goal:"Child will tolerate increased sensory input during grooming, play, and social interactions with max 1 significant negative response per session",service:"OT",priority:"High"});
    if(qc.Sensitivity==="More Than Others"||qc.Sensitivity==="Much More Than Others")goals.push({domain:"Sensory Processing",area:"sensory sensitivity",goal:"Child will demonstrate reduced sensory sensitivity responses (fight-flight-freeze) in 4/5 structured observations",service:"OT",priority:"High"});
    if(qc.Registration==="More Than Others"||qc.Registration==="Much More Than Others")goals.push({domain:"Sensory Processing",area:"sensory registration",goal:"Child will demonstrate improved registration of sensory input (respond within 3 prompts) in 4/5 classroom/home tasks",service:"OT",priority:"Medium"});
    Object.entries(dc).filter(([,v])=>v==="More Than"||v==="Much More").forEach(([d])=>{
      goals.push({domain:"Sensory Domain",area:d.toLowerCase(),goal:`Child will show improved ${d.toLowerCase()} processing as evidenced by reduced avoidance/seeking behaviors in 3/5 observations at 3-month re-assessment`,service:"OT",priority:dc[d]==="Much More"?"High":"Medium"});
    });
  }
  if(vanderbilt&&vanderbilt.adhdType!=="No Positive Screen"){
    if(vanderbilt.inattentionCount>=6)goals.push({domain:"Attention",area:"sustained attention",goal:"Child will sustain attention on structured tasks for age-appropriate duration (min 10-15 min) across 4/5 trials with minimal prompting",service:"OT/ABA",priority:"High"});
    if(vanderbilt.hyperactiveCount>=6)goals.push({domain:"Behavior",area:"self-regulation",goal:"Child will demonstrate self-regulatory strategies to manage hyperactivity in structured settings across 4/5 observations",service:"ABA/OT",priority:"High"});
    if(vanderbilt.oddPositive)goals.push({domain:"Behavior",area:"compliance/ODD",goal:"Child will comply with adult requests within 3 verbal prompts in 4/5 opportunities over 4 consecutive sessions",service:"ABA",priority:"High"});
    if(vanderbilt.anxietyPositive)goals.push({domain:"Social-Emotional",area:"anxiety management",goal:"Child will use 2 coping strategies independently when anxious in 3/5 opportunities",service:"ABA/OT",priority:"Medium"});
  }
  if(nicrca){
    NICRCA_DOMAINS.forEach(d=>{
      const s=nicrca[d.id];
      if(s&&s.pct<75){
        const sm={bio:"OT",phys:"OT/PT",adl:"OT",lang:"SLP",soc:"ABA/SLP",cog:"OT/SE",acad:"SE"};
        goals.push({domain:d.name,area:d.desc.split(",")[0].toLowerCase(),goal:`Child will demonstrate improvement in ${d.name.toLowerCase()} skills to age-appropriate level across 3 consecutive assessment sessions`,service:sm[d.id]||"OT",priority:s.pct<50?"High":"Medium"});
      }
    });
  }
  if(primitiveReflexes){
    const ret=Object.entries(primitiveReflexes).filter(([,v])=>v==="retained"||v==="partial");
    if(ret.length>0)goals.push({domain:"Neurodevelopmental",area:"primitive reflex integration",goal:`Child will demonstrate integration of ${ret.length} retained primitive reflex(es) through targeted therapy over 3-6 months`,service:"OT/PT",priority:"High"});
  }
  return goals;
}

function generateNarrative(child,scores){
  const name=child.name||"Child";
  const pr=child.gender==="Female"?{s:"she",p:"her",pos:"her"}:{s:"he",p:"him",pos:"his"};
  const today=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});
  const parts=[];
  parts.push(`${name} is a ${child.ageYears?child.ageYears+"-year":""}-old ${child.gender?child.gender.toLowerCase():"child"} who presented for a comprehensive neurodevelopmental assessment at Rehab Buddy Child Development Centre & Autism Research Institute. Assessment was conducted on ${today} by ${child.therapistName||"the clinical team"}. Referral reason: ${child.referralReason||"Developmental concerns noted by family/school."}`);
  if(scores.csp2){
    const{quadrantClassifications:qc,domainClassifications:dc}=scores.csp2;
    parts.push(`**SENSORY PROCESSING (Child Sensory Profile-2):** On the CSP-2, ${name} demonstrated the following quadrant profile — Seeking: "${qc.Seeking||"—"}", Avoiding: "${qc.Avoiding||"—"}", Sensitivity: "${qc.Sensitivity||"—"}", Registration: "${qc.Registration||"—"}". Domain analysis revealed elevated scores in: ${Object.entries(dc).filter(([,v])=>v==="More Than"||v==="Much More").map(([k])=>k.toLowerCase()).join(", ")||"no significantly elevated areas"}. These sensory processing patterns may impact ${pr.pos} daily functioning, learning, and behavior.`);
  }
  if(scores.vanderbilt){
    const v=scores.vanderbilt;
    parts.push(`**ATTENTION & BEHAVIOR (Vanderbilt ADHD Scale):** Parent-completed Vanderbilt ratings are ${v.adhdType!=="No Positive Screen"?"consistent with a positive screen for **"+v.adhdType+"**":"within non-significant range for ADHD"}. Inattention: ${v.inattentionCount}/9 items endorsed at ≥Often. Hyperactivity-Impulsivity: ${v.hyperactiveCount}/9 items endorsed.${v.oddPositive?" ODD indicators were also significantly elevated ("+v.oddCount+"/8), warranting further behavioral evaluation.":""}${v.anxietyPositive?" Anxiety-related symptoms were noted.":" "} These results require confirmation through comprehensive physician evaluation.`);
  }
  if(scores.dst){const d=scores.dst;parts.push(`**DEVELOPMENTAL SCREENING (DST):** ${name} passed ${d.passedCount} of ${d.total} administered milestone items, representing ${d.percentage}% overall developmental milestone attainment.`);}
  if(scores.vsms){const v=scores.vsms;parts.push(`**SOCIAL MATURITY (VSMS):** Social Age (SA) was estimated at ${Math.floor(v.socialAgeMonths/12)} years ${v.socialAgeMonths%12} months, yielding a Social Quotient (SQ) of ${v.socialQuotient}. ${v.socialQuotient>=85?"Social adaptive functioning within expected range.":v.socialQuotient>=70?"Mild delays in social adaptive functioning.":"Significant delays in social adaptive functioning requiring targeted intervention."}`);}
  if(scores.primitiveReflexes){
    const ret=Object.entries(scores.primitiveReflexes).filter(([,v])=>v==="retained");
    const part=Object.entries(scores.primitiveReflexes).filter(([,v])=>v==="partial");
    if(ret.length+part.length>0){parts.push(`**PRIMITIVE REFLEX ASSESSMENT:** Retained primitive reflexes identified — Fully retained: ${ret.map(([id])=>PRIM_REFLEXES.find(r=>r.id===id)?.name||id).join(", ")||"None"}. Partially retained: ${part.map(([id])=>PRIM_REFLEXES.find(r=>r.id===id)?.name||id).join(", ")||"None"}. Retained reflexes may significantly contribute to sensory, motor, behavioral, and academic challenges.`);}
  }
  if(scores.nicrca){
    const concerns=NICRCA_DOMAINS.filter(d=>scores.nicrca[d.id]?.pct<75).map(d=>d.name);
    if(concerns.length>0)parts.push(`**NICRCA DEVELOPMENTAL PROFILE:** Across 7 neurodevelopmental domains, the following areas demonstrated below-expected performance: ${concerns.join(", ")}. Detailed domain analysis is provided in the profile section.`);
  }
  return parts.join("\n\n");
}

function bandStyle(label){const color=BAND_COLORS[label]||T.textMuted;return{background:color+"22",color,border:`1px solid ${color}44`,padding:"3px 9px",borderRadius:12,fontSize:11,fontWeight:600,display:"inline-block"};}
function urgencyColor(pct){if(pct>=80)return T.success;if(pct>=65)return T.warning;if(pct>=50)return T.accent;return T.error;}

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.rb{font-family:'DM Sans',sans-serif;background:${T.bg};min-height:100vh;color:${T.text};}
.rh{font-family:'Syne',sans-serif;}
.rc{background:${T.bgCard};border:1px solid ${T.border};border-radius:12px;}
.rc2{background:${T.bgCard2};border:1px solid ${T.borderLight};border-radius:10px;}
.rbtn{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:8px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;transition:all 0.15s;}
.rbtn-p{background:${T.primary};color:#030D16;}.rbtn-p:hover{background:${T.primaryDark};}
.rbtn-g{background:transparent;color:${T.textMuted};border:1px solid ${T.border};}.rbtn-g:hover{background:${T.bgCard2};color:${T.text};}
.rin{width:100%;padding:10px 14px;background:${T.bgCard2};border:1px solid ${T.border};border-radius:8px;color:${T.text};font-family:'DM Sans',sans-serif;font-size:14px;outline:none;}
.rin:focus{border-color:${T.primary};}
.rin::placeholder{color:${T.textFaint};}
.rsel{width:100%;padding:10px 14px;background:${T.bgCard2};border:1px solid ${T.border};border-radius:8px;color:${T.text};font-size:14px;outline:none;cursor:pointer;}
.rta{width:100%;padding:10px 14px;background:${T.bgCard2};border:1px solid ${T.border};border-radius:8px;color:${T.text};font-size:14px;outline:none;resize:vertical;font-family:'DM Sans',sans-serif;}
.sitem{display:flex;align-items:center;gap:10px;padding:10px 16px;border-radius:9px;cursor:pointer;transition:all 0.15s;color:${T.textMuted};font-size:14px;}
.sitem:hover{background:${T.bgCard2};color:${T.text};}
.sitem.active{background:rgba(0,201,167,0.15);color:${T.primary};}
.aitem{padding:12px;border-bottom:1px solid ${T.border};transition:background 0.1s;}
.aitem:hover{background:${T.bgHover};}
.aitem:last-child{border-bottom:none;}
.notif{position:fixed;top:20px;right:20px;padding:12px 20px;border-radius:10px;z-index:9999;font-size:14px;}
.pb{height:6px;background:${T.border};border-radius:3px;overflow:hidden;}
.pf{height:100%;border-radius:3px;transition:width 0.3s;}
label.fl{display:block;font-size:12px;color:${T.textMuted};margin-bottom:6px;font-weight:500;letter-spacing:0.04em;text-transform:uppercase;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
@media(max-width:900px){.g4{grid-template-columns:1fr 1fr;}.g3{grid-template-columns:1fr 1fr;}.g2{grid-template-columns:1fr;}}
.tbbar{display:flex;gap:4px;padding:4px;background:${T.bgCard2};border-radius:10px;border:1px solid ${T.border};flex-wrap:wrap;}
.tb{padding:7px 14px;border-radius:7px;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.15s;color:${T.textMuted};}
.tb.active{background:${T.primary};color:#030D16;}
.scard{background:${T.bgCard};border:1px solid ${T.border};border-radius:12px;padding:18px 20px;}
.rrow{display:flex;align-items:flex-start;gap:12px;padding:12px;border-radius:8px;border:1px solid ${T.border};background:${T.bgCard2};}
input[type=checkbox]{accent-color:${T.primary};width:16px;height:16px;cursor:pointer;}
.dcard{border:2px solid ${T.border};border-radius:12px;padding:16px;cursor:pointer;transition:all 0.15s;}
.dcard:hover{border-color:rgba(0,201,167,0.4);}
.dcard.sel{border-color:${T.primary};background:rgba(0,201,167,0.07);}
.rtag{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:500;}
.rdiv{height:1px;background:${T.border};margin:16px 0;}
.rscroll{overflow-y:auto;scrollbar-width:thin;scrollbar-color:${T.border} transparent;}
`;

const ALL_TESTS=[
  {id:"csp2",label:"Child Sensory Profile 2 (CSP-2)",desc:"85-item caregiver questionnaire, ages 3–14y",service:"OT",items:85},
  {id:"vanderbilt",label:"Vanderbilt ADHD Scale (Parent)",desc:"33-item behavior rating — ADHD/ODD/Anxiety screen",service:"Developmental",items:33},
  {id:"dst",label:"Developmental Screening Test (DST)",desc:"Milestone assessment birth to 15y",service:"Allied",items:51},
  {id:"vsms",label:"Vineland Social Maturity Scale (VSMS)",desc:"Social adaptive behavior, 0-15y",service:"Allied",items:38},
  {id:"primitiveReflexes",label:"Primitive Reflex Assessment",desc:"12-reflex clinical observation checklist",service:"OT/PT",items:12},
  {id:"nicrca",label:"NICRCA — Rehab Buddy Neuro Domains",desc:"7-domain custom neurodevelopmental profile",service:"All",items:42},
];

const CSP2_DOMAINS_ORDER=["AUDITORY","VISUAL","TOUCH","MOVEMENT","BODY POSITION","ORAL SENSORY","CONDUCT","SOCIAL EMOTIONAL","ATTENTIONAL"];
const CSP2_DCOL={AUDITORY:T.secondary,VISUAL:T.gold,TOUCH:T.primary,MOVEMENT:T.seeking,"BODY POSITION":T.purple,"ORAL SENSORY":T.pink,CONDUCT:T.accent,"SOCIAL EMOTIONAL":T.registration,ATTENTIONAL:T.sensitivity};
const CSP2_QCOL={SK:T.seeking,AV:T.avoiding,SN:T.sensitivity,RG:T.registration};

// ──── LOGIN ────
function LoginScreen({onLogin}){
  const[email,setEmail]=useState("");const[pw,setPw]=useState("");
  const[showPw,setShowPw]=useState(false);const[err,setErr]=useState("");const[loading,setLoading]=useState(false);
  const go=async()=>{
    setLoading(true);setErr("");
    await new Promise(r=>setTimeout(r,600));
    const u=SYSTEM_USERS.find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.password===pw);
    if(u)onLogin(u);else setErr("Invalid credentials. Check with your administrator.");
    setLoading(false);
  };
  return(
    <div style={{minHeight:"100vh",background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:440}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:68,height:68,background:`linear-gradient(135deg,${T.primary},${T.secondary})`,borderRadius:18,marginBottom:14,fontSize:30}}>🧠</div>
          <h1 className="rh" style={{fontSize:28,fontWeight:800,color:T.text,marginBottom:4}}>Rehab Buddy</h1>
          <p style={{color:T.textMuted,fontSize:13}}>Child Development Centre & Autism Research Institute</p>
          <div style={{marginTop:10,display:"inline-block",padding:"3px 14px",background:"rgba(0,201,167,0.12)",border:`1px solid rgba(0,201,167,0.3)`,borderRadius:20,fontSize:11,color:T.primary,fontWeight:700,letterSpacing:"0.06em"}}>NICRCA CLINICAL DASHBOARD v2.0</div>
        </div>
        <div className="rc" style={{padding:32}}>
          <h2 className="rh" style={{fontSize:18,marginBottom:24,color:T.text}}>Sign in to your account</h2>
          <div style={{marginBottom:16}}><label className="fl">Email Address</label><input className="rin" type="email" placeholder="you@rehabbuddy.in" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} /></div>
          <div style={{marginBottom:20}}><label className="fl">Password</label><div style={{position:"relative"}}><input className="rin" type={showPw?"text":"password"} placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} style={{paddingRight:44}} /><button onClick={()=>setShowPw(v=>!v)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:T.textMuted,cursor:"pointer",fontSize:16}}>{showPw?"🙈":"👁️"}</button></div></div>
          {err&&<div style={{color:T.error,fontSize:13,marginBottom:14,padding:"8px 12px",background:"rgba(239,68,68,0.1)",borderRadius:8}}>{err}</div>}
          <button className="rbtn rbtn-p" style={{width:"100%",justifyContent:"center",padding:"12px",fontSize:15}} onClick={go} disabled={loading}>{loading?"Signing in…":"Sign In"}</button>
          <div className="rdiv"/>
          <div style={{fontSize:11,color:T.textFaint}}>
            <div style={{marginBottom:6,fontWeight:500,color:T.textMuted}}>Demo Credentials:</div>
            {SYSTEM_USERS.map(u=><div key={u.id} style={{marginBottom:3}}>{u.email} — {u.password}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──── SIDEBAR ────
function Sidebar({user,view,onNav,onLogout,collapsed,onToggle,assessments,children}){
  const nav=[{id:"dashboard",icon:"⊞",label:"Dashboard"},{id:"children",icon:"👦",label:"Children"},{id:"wizard",icon:"✚",label:"New Assessment",accent:true},{id:"reports",icon:"📋",label:"Reports"},{id:"homeplan",icon:"🏠",label:"Home Plans"},{id:"team",icon:"👥",label:"Team"}];
  return(
    <div style={{width:collapsed?72:240,background:T.bgCard,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",transition:"width 0.2s",flexShrink:0}}>
      <div style={{padding:"18px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:36,height:36,background:T.primary,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18}}>🧠</div>
        {!collapsed&&<div><div className="rh" style={{fontSize:14,fontWeight:700,color:T.text}}>Rehab Buddy</div><div style={{fontSize:10,color:T.textMuted}}>NICRCA Dashboard</div></div>}
        <button onClick={onToggle} style={{marginLeft:"auto",background:"none",border:"none",color:T.textMuted,cursor:"pointer",fontSize:16,flexShrink:0}}>{collapsed?"›":"‹"}</button>
      </div>
      <nav style={{flex:1,padding:"12px 8px",display:"flex",flexDirection:"column",gap:2}}>
        {nav.map(item=>(
          <div key={item.id} className={`sitem${view===item.id?" active":""}`} onClick={()=>onNav(item.id)} style={{justifyContent:collapsed?"center":"flex-start",...(item.accent&&view!==item.id?{color:T.primary}:{})}}>
            <span style={{fontSize:17,flexShrink:0}}>{item.icon}</span>
            {!collapsed&&<span>{item.label}</span>}
            {!collapsed&&item.accent&&<span style={{marginLeft:"auto",fontSize:10,background:T.primary,color:"#030D16",padding:"2px 7px",borderRadius:10,fontWeight:600}}>NEW</span>}
          </div>
        ))}
      </nav>
      {!collapsed&&(
        <div style={{padding:"12px 16px",borderTop:`1px solid ${T.border}`}}>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <div style={{flex:1,background:T.bgCard2,borderRadius:8,padding:"8px 12px",textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:T.primary}}>{children.length}</div><div style={{fontSize:10,color:T.textMuted}}>Children</div></div>
            <div style={{flex:1,background:T.bgCard2,borderRadius:8,padding:"8px 12px",textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:T.secondary}}>{assessments.length}</div><div style={{fontSize:10,color:T.textMuted}}>Reports</div></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:T.primary+"33",display:"flex",alignItems:"center",justifyContent:"center",color:T.primary,fontWeight:700,fontSize:13,flexShrink:0}}>{user?.initials}</div>
            <div style={{flex:1,overflow:"hidden"}}><div style={{fontSize:13,fontWeight:500,color:T.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user?.name}</div><div style={{fontSize:11,color:T.textMuted}}>{user?.role}</div></div>
            <button onClick={onLogout} style={{background:"none",border:"none",color:T.accent,cursor:"pointer",fontSize:16}} title="Logout">⏻</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ──── DASHBOARD ────
function DashboardView({user,children,assessments,onNewAssessment,onViewReport}){
  const today=new Date();
  const recent=[...assessments].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,6);
  const stats=[
    {label:"Total Children",value:children.length,color:T.primary,icon:"👦"},
    {label:"Assessments Done",value:assessments.length,color:T.secondary,icon:"📋"},
    {label:"This Month",value:assessments.filter(a=>{const d=new Date(a.date);return d.getMonth()===today.getMonth()&&d.getFullYear()===today.getFullYear();}).length,color:T.gold,icon:"📅"},
    {label:"High Priority Goals",value:assessments.reduce((s,a)=>s+(a.goals||[]).filter(g=>g.priority==="High").length,0),color:T.accent,icon:"⚠"},
  ];
  return(
    <div style={{padding:28}}>
      <div style={{marginBottom:24}}>
        <h1 className="rh" style={{fontSize:26,fontWeight:700,color:T.text}}>Good {today.getHours()<12?"morning":today.getHours()<17?"afternoon":"evening"}, {user?.name?.split(" ")[0]} 👋</h1>
        <p style={{color:T.textMuted,marginTop:4}}>{today.toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
      </div>
      <div className="g4" style={{marginBottom:24}}>
        {stats.map(s=>(
          <div key={s.label} className="scard">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div><div style={{fontSize:11,color:T.textMuted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{s.label}</div><div style={{fontSize:32,fontWeight:700,color:s.color}}>{s.value}</div></div>
              <div style={{fontSize:28}}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
        <div className="rc" style={{padding:24}}>
          <h2 className="rh" style={{fontSize:16,fontWeight:600,marginBottom:18,color:T.text}}>Quick Actions</h2>
          <button className="rbtn rbtn-p" style={{width:"100%",justifyContent:"flex-start",padding:"14px 18px",fontSize:15,marginBottom:12}} onClick={onNewAssessment}>✚ Start New Assessment</button>
          <div style={{fontSize:13,fontWeight:600,color:T.textMuted,marginBottom:10,marginTop:8}}>Assessment Battery Available:</div>
          {ALL_TESTS.map(t=>(
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
              <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",background:T.bgCard2,border:`1px solid ${T.border}`,borderRadius:5,color:T.primary,minWidth:55,textAlign:"center"}}>{t.id.toUpperCase().slice(0,6)}</span>
              <span style={{fontSize:12,color:T.text,flex:1}}>{t.label}</span>
              <span style={{fontSize:10,color:T.textMuted}}>{t.items} items</span>
            </div>
          ))}
        </div>
        <div className="rc" style={{padding:24}}>
          <h2 className="rh" style={{fontSize:16,fontWeight:600,marginBottom:18,color:T.text}}>Recent Assessments</h2>
          {recent.length===0?(
            <div style={{textAlign:"center",color:T.textMuted,padding:"40px 0"}}><div style={{fontSize:40,marginBottom:12}}>📋</div><div>No assessments yet.</div></div>
          ):(
            recent.map(a=>(
              <div key={a.id} className="aitem" onClick={()=>onViewReport(a)} style={{cursor:"pointer",borderRadius:8,padding:"12px 10px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div><div style={{fontSize:14,fontWeight:500,color:T.text}}>{a.childName}</div><div style={{fontSize:11,color:T.textMuted,marginTop:2}}>{(a.testsCompleted||[]).join(" • ")}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:11,color:T.textMuted}}>{new Date(a.date).toLocaleDateString("en-IN")}</div><span className="rtag" style={{background:T.primary+"22",color:T.primary,marginTop:4,display:"inline-block"}}>View →</span></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="rc" style={{padding:24}}>
        <h2 className="rh" style={{fontSize:16,fontWeight:600,marginBottom:18,color:T.text}}>NICRCA Clinical Framework — Goal Hierarchy</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:10}}>
          {NICRCA_DOMAINS.map(d=>(
            <div key={d.id} style={{background:d.color+"15",border:`1px solid ${d.color}44`,borderRadius:10,padding:12,textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:6}}>{d.icon}</div>
              <div style={{fontSize:11,fontWeight:600,color:d.color,marginBottom:4}}>{d.name}</div>
              <div style={{fontSize:9,color:T.textMuted,lineHeight:1.4}}>{d.desc.split(",")[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──── CHILDREN ────
function ChildrenView({children,onSave,notify}){
  const[showForm,setShowForm]=useState(false);
  const[form,setForm]=useState({name:"",dob:"",gender:"Male",diagnosis:"",referralReason:"",parentName:"",parentContact:"",school:"",therapistName:"",notes:""});
  const calcAge=dob=>{if(!dob)return"";const d=new Date(dob),n=new Date();const t=(n.getFullYear()-d.getFullYear())*12+(n.getMonth()-d.getMonth());return t>=12?`${Math.floor(t/12)}y ${t%12}m`:`${t}m`;};
  const save=()=>{
    if(!form.name||!form.dob){notify("Name and DOB required","error");return;}
    const dob=new Date(form.dob),now=new Date();
    const mo=(now.getFullYear()-dob.getFullYear())*12+(now.getMonth()-dob.getMonth());
    onSave([...children,{...form,id:Date.now().toString(),ageYears:Math.floor(mo/12),ageMonths:mo%12,chronAgeMo:mo,createdAt:new Date().toISOString()}]);
    setShowForm(false);setForm({name:"",dob:"",gender:"Male",diagnosis:"",referralReason:"",parentName:"",parentContact:"",school:"",therapistName:"",notes:""});
    notify("Child profile saved!");
  };
  return(
    <div style={{padding:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div><h1 className="rh" style={{fontSize:22,fontWeight:700,color:T.text}}>Children</h1><p style={{color:T.textMuted,fontSize:13,marginTop:4}}>{children.length} registered profiles</p></div>
        <button className="rbtn rbtn-p" onClick={()=>setShowForm(true)}>✚ Add Child</button>
      </div>
      {showForm&&(
        <div className="rc" style={{padding:24,marginBottom:24,border:`1px solid ${T.primary}44`}}>
          <h2 className="rh" style={{fontSize:16,fontWeight:600,marginBottom:20,color:T.primary}}>New Child Profile</h2>
          <div className="g2">
            <div><label className="fl">Full Name *</label><input className="rin" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Child's full name"/></div>
            <div><label className="fl">Date of Birth *</label><input className="rin" type="date" value={form.dob} onChange={e=>setForm(f=>({...f,dob:e.target.value}))}/></div>
            <div><label className="fl">Gender</label><select className="rsel" value={form.gender} onChange={e=>setForm(f=>({...f,gender:e.target.value}))}><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div><label className="fl">Diagnosis / Concern</label><input className="rin" value={form.diagnosis} onChange={e=>setForm(f=>({...f,diagnosis:e.target.value}))} placeholder="ASD, ADHD, GDD, etc."/></div>
            <div><label className="fl">Referral Reason</label><input className="rin" value={form.referralReason} onChange={e=>setForm(f=>({...f,referralReason:e.target.value}))} placeholder="Reason for referral"/></div>
            <div><label className="fl">Assigned Therapist</label><input className="rin" value={form.therapistName} onChange={e=>setForm(f=>({...f,therapistName:e.target.value}))} placeholder="Therapist name"/></div>
            <div><label className="fl">Parent/Guardian Name</label><input className="rin" value={form.parentName} onChange={e=>setForm(f=>({...f,parentName:e.target.value}))} placeholder="Parent name"/></div>
            <div><label className="fl">Parent Contact</label><input className="rin" value={form.parentContact} onChange={e=>setForm(f=>({...f,parentContact:e.target.value}))} placeholder="+91 XXXXX XXXXX"/></div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:16}}><button className="rbtn rbtn-p" onClick={save}>Save Profile</button><button className="rbtn rbtn-g" onClick={()=>setShowForm(false)}>Cancel</button></div>
        </div>
      )}
      {children.length===0&&!showForm?(
        <div className="rc" style={{padding:60,textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>👦</div><h2 style={{color:T.textMuted}}>No children registered</h2></div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
          {children.map(c=>(
            <div key={c.id} className="rc" style={{padding:20}}>
              <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:48,height:48,borderRadius:"50%",background:c.gender==="Female"?T.pink+"33":T.secondary+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{c.gender==="Female"?"👧":"👦"}</div>
                <div><div style={{fontSize:16,fontWeight:600,color:T.text}}>{c.name}</div><div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{calcAge(c.dob)} • {c.gender} • {c.diagnosis||"No diagnosis"}</div>{c.therapistName&&<div style={{fontSize:11,color:T.primary,marginTop:4}}>🩺 {c.therapistName}</div>}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ──── WIZARD ────
function AssessmentWizard({children,state,setState,onComplete,onBack,notify}){
  const[activeTab,setActiveTab]=useState(null);
  const step=state?.step||0;
  const upd=p=>setState(prev=>({...prev,...p}));
  const child=children.find(c=>c.id===state?.childId);
  const steps=["Select Child","Choose Tests","Administer","Review & Generate"];

  const complete=async()=>{
    if(!child){notify("Please select a child","error");return;}
    if(!state.selectedTests.length){notify("Select at least one test","error");return;}
    const scores={};
    if(state.selectedTests.includes("csp2"))scores.csp2=scoreCSP2(state.responses.csp2||{});
    if(state.selectedTests.includes("vanderbilt"))scores.vanderbilt=scoreVanderbilt(state.responses.vanderbilt||{});
    if(state.selectedTests.includes("dst"))scores.dst=scoreDST(state.responses.dst||{});
    if(state.selectedTests.includes("vsms"))scores.vsms=scoreVSMS(state.responses.vsms||{},child.chronAgeMo||60);
    if(state.selectedTests.includes("primitiveReflexes"))scores.primitiveReflexes=state.responses.primitiveReflexes||{};
    if(state.selectedTests.includes("nicrca"))scores.nicrca=scoreNICRCA(state.responses.nicrca||{});
    const goals=generateGoals(scores);
    const narrative=generateNarrative(child,scores);
    onComplete({id:Date.now().toString(),date:new Date().toISOString(),childId:child.id,childName:child.name,childAge:`${child.ageYears}y ${child.ageMonths}m`,childGender:child.gender,diagnosis:child.diagnosis,therapistName:child.therapistName,testsCompleted:state.selectedTests,rawResponses:state.responses,scores,goals,narrative});
  };

  return(
    <div style={{padding:28}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
        <button className="rbtn rbtn-g" onClick={onBack}>← Back</button>
        <div><h1 className="rh" style={{fontSize:22,fontWeight:700,color:T.text}}>New Assessment</h1><p style={{color:T.textMuted,fontSize:13}}>Step {step+1} of {steps.length}: {steps[step]}</p></div>
      </div>
      <div style={{display:"flex",gap:0,marginBottom:28}}>
        {steps.map((s,i)=>(
          <div key={i} style={{flex:1,display:"flex",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:i<step?T.primary:i===step?T.secondary:T.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:i<=step?"#030D16":T.textMuted,fontWeight:700}}>{i<step?"✓":i+1}</div>
              <span style={{fontSize:12,color:i===step?T.text:T.textMuted}}>{s}</span>
            </div>
            {i<steps.length-1&&<div style={{flex:1,height:2,background:i<step?T.primary:T.border,margin:"0 8px"}}/>}
          </div>
        ))}
      </div>

      {step===0&&(
        <div>
          <h2 className="rh" style={{fontSize:17,marginBottom:16,color:T.text}}>Select Child</h2>
          {children.length===0?<div className="rc" style={{padding:40,textAlign:"center"}}><div style={{fontSize:36,marginBottom:12}}>👦</div><p style={{color:T.textMuted}}>No children registered yet. Add a child profile first.</p></div>:(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12}}>
              {children.map(c=>(
                <div key={c.id} onClick={()=>upd({childId:c.id})} className={`dcard${state.childId===c.id?" sel":""}`}>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}><div style={{fontSize:28}}>{c.gender==="Female"?"👧":"👦"}</div><div><div style={{fontSize:15,fontWeight:600,color:T.text}}>{c.name}</div><div style={{fontSize:12,color:T.textMuted}}>{c.ageYears}y {c.ageMonths}m • {c.diagnosis||"No diagnosis"}</div></div></div>
                </div>
              ))}
            </div>
          )}
          <button className="rbtn rbtn-p" style={{marginTop:20}} onClick={()=>{if(!state.childId){notify("Please select a child","error");return;}upd({step:1});}}>Next: Choose Tests →</button>
        </div>
      )}

      {step===1&&(
        <div>
          <h2 className="rh" style={{fontSize:17,marginBottom:6,color:T.text}}>Select Assessments for {child?.name}</h2>
          <p style={{color:T.textMuted,fontSize:13,marginBottom:20}}>Choose all tests appropriate for this child's age and profile.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {ALL_TESTS.map(t=>{
              const sel=state.selectedTests.includes(t.id);
              return(
                <div key={t.id} onClick={()=>upd({selectedTests:sel?state.selectedTests.filter(x=>x!==t.id):[...state.selectedTests,t.id]})} className={`dcard${sel?" sel":""}`}>
                  <div style={{display:"flex",gap:10}}>
                    <input type="checkbox" checked={sel} onChange={()=>{}} style={{marginTop:3,flexShrink:0}}/>
                    <div><div style={{fontSize:14,fontWeight:600,color:T.text}}>{t.label}</div><div style={{fontSize:12,color:T.textMuted,marginTop:3}}>{t.desc}</div><div style={{display:"flex",gap:6,marginTop:8}}><span className="rtag" style={{background:T.secondary+"22",color:T.secondary}}>{t.service}</span><span className="rtag" style={{background:T.bgCard2,color:T.textMuted}}>{t.items} items</span></div></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button className="rbtn rbtn-g" onClick={()=>upd({step:0})}>← Back</button>
            <button className="rbtn rbtn-p" onClick={()=>{if(!state.selectedTests.length){notify("Select at least one test","error");return;}upd({step:2});setActiveTab(state.selectedTests[0]);}}>Start Assessment ({state.selectedTests.length} test{state.selectedTests.length!==1?"s":""}) →</button>
          </div>
        </div>
      )}

      {step===2&&(
        <div>
          <div style={{marginBottom:16}}><h2 className="rh" style={{fontSize:17,color:T.text,marginBottom:4}}>Administer Tests — {child?.name}</h2><p style={{color:T.textMuted,fontSize:13}}>Complete each selected assessment tab.</p></div>
          <div className="tbbar" style={{marginBottom:20}}>
            {state.selectedTests.map(tid=>{const t=ALL_TESTS.find(x=>x.id===tid);return<div key={tid} className={`tb${activeTab===tid?" active":""}`} onClick={()=>setActiveTab(tid)}>{t?.label?.split("(")[0].trim()}</div>;})}
          </div>
          {activeTab==="csp2"&&<CSP2Form responses={state.responses.csp2||{}} onChange={r=>upd({responses:{...state.responses,csp2:r}})}/>}
          {activeTab==="vanderbilt"&&<VanderbiltForm responses={state.responses.vanderbilt||{}} onChange={r=>upd({responses:{...state.responses,vanderbilt:r}})}/>}
          {activeTab==="dst"&&<DSTForm responses={state.responses.dst||{}} onChange={r=>upd({responses:{...state.responses,dst:r}})} child={child}/>}
          {activeTab==="vsms"&&<VSMSForm responses={state.responses.vsms||{}} onChange={r=>upd({responses:{...state.responses,vsms:r}})} child={child}/>}
          {activeTab==="primitiveReflexes"&&<PrimReflexForm responses={state.responses.primitiveReflexes||{}} onChange={r=>upd({responses:{...state.responses,primitiveReflexes:r}})}/>}
          {activeTab==="nicrca"&&<NICRCAForm responses={state.responses.nicrca||{}} onChange={r=>upd({responses:{...state.responses,nicrca:r}})}/>}
          <div style={{display:"flex",gap:10,marginTop:24}}><button className="rbtn rbtn-g" onClick={()=>upd({step:1})}>← Back</button><button className="rbtn rbtn-p" onClick={()=>upd({step:3})}>Review & Generate Report →</button></div>
        </div>
      )}

      {step===3&&(
        <div>
          <h2 className="rh" style={{fontSize:17,color:T.text,marginBottom:20}}>Review & Generate Report</h2>
          <div className="rc" style={{padding:24,marginBottom:20}}>
            <div className="g2"><div><div style={{fontSize:12,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.05em"}}>Child</div><div style={{fontSize:16,fontWeight:600,color:T.text,marginTop:4}}>{child?.name}</div><div style={{fontSize:13,color:T.textMuted}}>{child?.ageYears}y {child?.ageMonths}m • {child?.diagnosis||"No diagnosis"}</div></div><div><div style={{fontSize:12,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.05em"}}>Tests Selected</div><div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:6}}>{state.selectedTests.map(id=>{const t=ALL_TESTS.find(x=>x.id===id);return<span key={id} className="rtag" style={{background:T.primary+"22",color:T.primary}}>{t?.label?.split("(")[0].trim()}</span>;})}</div></div></div>
          </div>
          <div className="rc" style={{padding:24,marginBottom:20,background:`${T.primary}08`,border:`1px solid ${T.primary}33`}}>
            {["Calculate all scores and classifications","Generate quadrant & domain profiles with charts","Create a full auto-generated clinical narrative","Set therapy goals by domain & service","Build a home plan outline","Generate intervention hierarchy"].map(item=>(
              <div key={item} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:14,color:T.text}}><span style={{color:T.success}}>✓</span>{item}</div>
            ))}
          </div>
          <div style={{display:"flex",gap:10}}><button className="rbtn rbtn-g" onClick={()=>upd({step:2})}>← Back</button><button className="rbtn rbtn-p" onClick={complete} style={{fontSize:15,padding:"12px 24px"}}>🚀 Generate Complete Report</button></div>
        </div>
      )}
    </div>
  );
}

// ──── CSP-2 FORM ────
function CSP2Form({responses,onChange}){
  const[domain,setDomain]=useState("AUDITORY");
  const items=CSP2_CHILD_ITEMS.filter(i=>i.domain===domain);
  const answered=Object.keys(responses).length;
  const total=CSP2_CHILD_ITEMS.length;
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:13,color:T.textMuted}}>CSP-2 — Rate how often (1=Almost Never, 5=Almost Always). Leave blank for Does Not Apply.</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div className="pb" style={{width:100}}><div className="pf" style={{width:`${Math.round((answered/total)*100)}%`,background:T.primary}}/></div><span style={{fontSize:12,color:T.textMuted}}>{answered}/{total}</span></div>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
        {CSP2_DOMAINS_ORDER.map(d=>{
          const its=CSP2_CHILD_ITEMS.filter(i=>i.domain===d);
          const done=its.filter(i=>responses[i.id]!==undefined).length;
          return<div key={d} onClick={()=>setDomain(d)} style={{padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:11,fontWeight:600,border:`1px solid ${domain===d?CSP2_DCOL[d]:T.border}`,background:domain===d?CSP2_DCOL[d]+"22":"transparent",color:domain===d?CSP2_DCOL[d]:T.textMuted}}>{done===its.length?"✓ ":""}{d} ({done}/{its.length})</div>;
        })}
      </div>
      <div className="rc2" style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"12px 16px",background:CSP2_DCOL[domain]+"22",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:CSP2_DCOL[domain]}}/><span style={{fontWeight:600,color:CSP2_DCOL[domain],fontSize:14}}>{domain} PROCESSING</span>
        </div>
        {items.map((item,idx)=>(
          <div key={item.id} style={{padding:"13px 16px",borderBottom:idx<items.length-1?`1px solid ${T.border}`:"none",display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{flexShrink:0}}><span style={{fontSize:11,fontWeight:700,color:T.textFaint,display:"block",minWidth:24}}>{item.id}</span>{item.q&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:4,background:CSP2_QCOL[item.q]+"33",color:CSP2_QCOL[item.q],fontWeight:700,display:"block",marginTop:3}}>{item.q}</span>}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,color:T.text,marginBottom:10,lineHeight:1.5}}>My child… {CSP2_ITEM_TEXTS[item.id]}</div>
              <div style={{display:"flex",gap:6}}>
                {[1,2,3,4,5].map(v=>(
                  <button key={v} onClick={()=>onChange({...responses,[item.id]:v})} style={{width:36,height:36,borderRadius:8,border:`1px solid ${responses[item.id]===v?CSP2_DCOL[domain]:T.border}`,background:responses[item.id]===v?CSP2_DCOL[domain]+"33":T.bgCard,color:responses[item.id]===v?CSP2_DCOL[domain]:T.textMuted,fontWeight:responses[item.id]===v?700:400,cursor:"pointer",fontSize:14,transition:"all 0.1s"}}>{v}</button>
                ))}
                <button onClick={()=>{const r={...responses};delete r[item.id];onChange(r);}} style={{padding:"0 10px",height:36,borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",color:T.textFaint,cursor:"pointer",fontSize:11}}>DNA</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──── VANDERBILT FORM ────
const VAND_SS_COLORS={"ADHD-I":T.secondary,"ADHD-H":T.gold,ODD:T.accent,ANXIETY:T.purple};
const VAND_SS_LABELS={"ADHD-I":"Inattention","ADHD-H":"Hyperactivity-Impulsivity",ODD:"Oppositional",ANXIETY:"Anxiety/Mood"};
function VanderbiltForm({responses,onChange}){
  const[ss,setSs]=useState("ADHD-I");
  const items=VAND_ITEMS.filter(i=>i.ss===ss);
  const answered=Object.keys(responses).length;
  return(
    <div>
      <div style={{fontSize:13,color:T.textMuted,marginBottom:14}}>Vanderbilt ADHD Parent Rating Scale — past 6 months. <span style={{color:T.warning}}>Score ≥2 (Often/Very Often) = clinically significant</span></div>
      <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
        {Object.entries(VAND_SS_LABELS).map(([k,v])=>{const its=VAND_ITEMS.filter(i=>i.ss===k);const done=its.filter(i=>responses[i.id]!==undefined).length;return<div key={k} onClick={()=>setSs(k)} style={{padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:600,border:`1px solid ${ss===k?VAND_SS_COLORS[k]:T.border}`,background:ss===k?VAND_SS_COLORS[k]+"22":"transparent",color:ss===k?VAND_SS_COLORS[k]:T.textMuted}}>{v} ({done}/{its.length})</div>;})}
        <div style={{marginLeft:"auto",fontSize:12,color:T.textMuted}}>{answered}/{VAND_ITEMS.length} answered</div>
      </div>
      <div className="rc2" style={{padding:0,overflow:"hidden"}}>
        {items.map((item,idx)=>(
          <div key={item.id} style={{padding:"13px 16px",borderBottom:idx<items.length-1?`1px solid ${T.border}`:"none",display:"flex",gap:12,alignItems:"flex-start"}}>
            <span style={{fontSize:11,fontWeight:700,color:T.textFaint,minWidth:24,paddingTop:2}}>{item.id}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,color:T.text,marginBottom:10,lineHeight:1.5}}>{item.t}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {["Never","Occasionally","Often","Very Often"].map((l,v)=>(
                  <button key={v} onClick={()=>onChange({...responses,[item.id]:v})} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${responses[item.id]===v?(v>=2?T.accent:VAND_SS_COLORS[item.ss]):T.border}`,background:responses[item.id]===v?(v>=2?T.accent+"33":VAND_SS_COLORS[item.ss]+"22"):T.bgCard,color:responses[item.id]===v?(v>=2?T.accent:VAND_SS_COLORS[item.ss]):T.textMuted,cursor:"pointer",fontSize:12,fontWeight:responses[item.id]===v?600:400,transition:"all 0.1s"}}>
                    {v} — {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──── DST FORM ────
const DOM_COLORS={Motor:T.primary,Language:T.secondary,Social:T.gold,Cognitive:T.purple,"Self-care":T.success};
function DSTForm({responses,onChange,child}){
  const[group,setGroup]=useState("0-3m");
  const items=DST_ITEMS.filter(i=>i.ag===group);
  const answered=Object.values(responses).filter(Boolean).length;
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div style={{fontSize:13,color:T.textMuted}}>Developmental Screening Test — Dr. Bharath Raj. Check ✓ for passed items.</div><div style={{fontSize:12,color:T.textMuted}}>{answered}/{DST_ITEMS.length} passed</div></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
        {DST_AGE_GROUPS.map(g=>{const its=DST_ITEMS.filter(i=>i.ag===g);const done=its.filter(i=>responses[i.id]).length;return<div key={g} onClick={()=>setGroup(g)} style={{padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:11,fontWeight:600,border:`1px solid ${group===g?T.primary:T.border}`,background:group===g?`${T.primary}22`:"transparent",color:group===g?T.primary:T.textMuted}}>{g} ({done}/{its.length})</div>;})}
      </div>
      <div className="rc2" style={{padding:0,overflow:"hidden"}}>
        {items.map((item,idx)=>(
          <div key={item.id} style={{padding:"12px 16px",borderBottom:idx<items.length-1?`1px solid ${T.border}`:"none",display:"flex",gap:12,alignItems:"center"}}>
            <input type="checkbox" checked={!!responses[item.id]} onChange={e=>onChange({...responses,[item.id]:e.target.checked})}/>
            <span style={{flex:1,fontSize:13,color:T.text}}>{item.t}</span>
            <span className="rtag" style={{background:(DOM_COLORS[item.dom]||T.textMuted)+"22",color:DOM_COLORS[item.dom]||T.textMuted,flexShrink:0}}>{item.dom}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──── VSMS FORM ────
function VSMSForm({responses,onChange,child}){
  const[group,setGroup]=useState("0-1y");
  const items=VSMS_ITEMS.filter(i=>i.ag===group);
  const answered=Object.keys(responses).length;
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div style={{fontSize:13,color:T.textMuted}}>VSMS (Dr. A.J. Malin) — ✓=Pass, ✗=Fail, ½=Opportunity not available</div><div style={{fontSize:12,color:T.textMuted}}>CA: {child?.ageYears}y {child?.ageMonths}m • {answered}/{VSMS_ITEMS.length} answered</div></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
        {VSMS_AGE_GROUPS.map(g=>{const its=VSMS_ITEMS.filter(i=>i.ag===g);const done=its.filter(i=>responses[i.id]!==undefined).length;return<div key={g} onClick={()=>setGroup(g)} style={{padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:11,fontWeight:600,border:`1px solid ${group===g?T.gold:T.border}`,background:group===g?`${T.gold}22`:"transparent",color:group===g?T.gold:T.textMuted}}>{g} ({done}/{its.length})</div>;})}
      </div>
      <div className="rc2" style={{padding:0,overflow:"hidden"}}>
        {items.map((item,idx)=>(
          <div key={item.id} style={{padding:"12px 16px",borderBottom:idx<items.length-1?`1px solid ${T.border}`:"none",display:"flex",gap:10,alignItems:"center"}}>
            <div style={{display:"flex",gap:5}}>
              <button onClick={()=>onChange({...responses,[item.id]:true})} style={{width:32,height:32,borderRadius:6,border:`1px solid ${responses[item.id]===true?T.success:T.border}`,background:responses[item.id]===true?`${T.success}33`:T.bgCard,color:responses[item.id]===true?T.success:T.textMuted,cursor:"pointer",fontSize:14,fontWeight:700}}>✓</button>
              <button onClick={()=>onChange({...responses,[item.id]:false})} style={{width:32,height:32,borderRadius:6,border:`1px solid ${responses[item.id]===false?T.accent:T.border}`,background:responses[item.id]===false?`${T.accent}33`:T.bgCard,color:responses[item.id]===false?T.accent:T.textMuted,cursor:"pointer",fontSize:14,fontWeight:700}}>✗</button>
              <button onClick={()=>onChange({...responses,[item.id]:0.5})} style={{width:32,height:32,borderRadius:6,border:`1px solid ${responses[item.id]===0.5?T.warning:T.border}`,background:responses[item.id]===0.5?`${T.warning}33`:T.bgCard,color:responses[item.id]===0.5?T.warning:T.textMuted,cursor:"pointer",fontSize:12,fontWeight:700}}>½</button>
            </div>
            <span style={{fontSize:11,color:T.textFaint,flexShrink:0}}>#{item.id}</span>
            <span style={{fontSize:13,color:T.text,flex:1}}>{item.t}</span>
            <span style={{fontSize:11,color:T.textMuted,flexShrink:0}}>{item.v}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──── PRIM REFLEX FORM ────
const STATUS_OPTS=[{v:"integrated",l:"Integrated ✓",c:T.success},{v:"partial",l:"Partially Retained",c:T.warning},{v:"retained",l:"Fully Retained ⚠",c:T.error},{v:"not_tested",l:"Not Tested",c:T.textFaint}];
function PrimReflexForm({responses,onChange}){
  return(
    <div>
      <div style={{fontSize:13,color:T.textMuted,marginBottom:12}}>Observe/test each reflex and classify its integration status. Retained reflexes beyond expected age require targeted intervention.</div>
      <div style={{background:`${T.accent}15`,border:`1px solid ${T.accent}33`,borderRadius:8,padding:"10px 14px",marginBottom:18,fontSize:12,color:T.accent}}>⚠ Retained primitive reflexes may contribute significantly to sensory, motor, behavioral, and academic difficulties.</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {PRIM_REFLEXES.map(reflex=>{
          const val=responses[reflex.id]||"not_tested";
          return(
            <div key={reflex.id} className="rrow">
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:3}}>{reflex.name}</div>
                <div style={{fontSize:11,color:T.textMuted,marginBottom:3}}>Expected: <span style={{color:T.primary}}>{reflex.int}</span> | Test: {reflex.test}</div>
                <div style={{fontSize:11,color:T.textFaint}}>Impact: {reflex.impact}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0,minWidth:170}}>
                {STATUS_OPTS.map(opt=>(
                  <button key={opt.v} onClick={()=>onChange({...responses,[reflex.id]:opt.v})} style={{padding:"5px 12px",borderRadius:7,border:`1px solid ${val===opt.v?opt.c:T.border}`,background:val===opt.v?`${opt.c}22`:T.bgCard,color:val===opt.v?opt.c:T.textMuted,cursor:"pointer",fontSize:12,fontWeight:val===opt.v?600:400,textAlign:"left",transition:"all 0.1s"}}>{opt.l}</button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ──── NICRCA FORM ────
function NICRCAForm({responses,onChange}){
  const[ad,setAd]=useState("bio");
  const dom=NICRCA_DOMAINS.find(d=>d.id===ad);
  const answered=Object.values(responses).filter(v=>v!==undefined).length;
  const total=NICRCA_DOMAINS.reduce((s,d)=>s+d.items.length,0);
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={{fontSize:13,color:T.textMuted}}>Rehab Buddy NICRCA — 7-Domain Neurodevelopmental Profile</div><div style={{fontSize:12,color:T.textMuted}}>{answered}/{total} items rated</div></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
        {NICRCA_DOMAINS.map(d=>{const done=d.items.filter(i=>responses[i.id]!==undefined).length;const isA=ad===d.id;return<div key={d.id} onClick={()=>setAd(d.id)} style={{padding:"6px 14px",borderRadius:20,cursor:"pointer",fontSize:11,fontWeight:600,border:`2px solid ${isA?d.color:T.border}`,background:isA?`${d.color}20`:"transparent",color:isA?d.color:T.textMuted,display:"flex",alignItems:"center",gap:6}}><span>{d.icon}</span>{d.name.split(" ")[0]} ({done}/{d.items.length})</div>;})}
      </div>
      {dom&&(
        <div>
          <div style={{padding:"14px 18px",background:`${dom.color}15`,border:`1px solid ${dom.color}33`,borderRadius:"10px 10px 0 0",display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:22}}>{dom.icon}</span><div><div style={{fontWeight:700,color:dom.color,fontSize:15}}>{dom.name}</div><div style={{fontSize:12,color:T.textMuted}}>{dom.desc}</div></div></div>
          <div className="rc2" style={{borderRadius:"0 0 10px 10px",padding:0,overflow:"hidden"}}>
            {dom.items.map((item,idx)=>{
              const val=responses[item.id];
              return(
                <div key={item.id} style={{padding:"13px 16px",borderBottom:idx<dom.items.length-1?`1px solid ${T.border}`:"none"}}>
                  <div style={{fontSize:13,color:T.text,marginBottom:10,lineHeight:1.5}}>{idx+1}. {item.t}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {NICRCA_OPTIONS.map(opt=>(
                      <button key={opt.v} onClick={()=>onChange({...responses,[item.id]:opt.v})} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${val===opt.v?dom.color:T.border}`,background:val===opt.v?`${dom.color}25`:T.bgCard,color:val===opt.v?dom.color:T.textMuted,cursor:"pointer",fontSize:12,fontWeight:val===opt.v?600:400,transition:"all 0.1s"}}>{opt.l}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ──── REPORT VIEW ────
function ReportView({assessment,onBack,notify}){
  const[tab,setTab]=useState("overview");
  const{scores,goals,narrative,childName,childAge,childGender,diagnosis,therapistName,date,testsCompleted}=assessment;
  const TABS=[
    {id:"overview",label:"Overview"},
    ...(scores.csp2?[{id:"csp2",label:"CSP-2 Profile"}]:[]),
    ...(scores.vanderbilt?[{id:"vand",label:"ADHD / Behavior"}]:[]),
    ...(scores.nicrca?[{id:"nicrca",label:"NICRCA Domains"}]:[]),
    ...(scores.primitiveReflexes?[{id:"reflexes",label:"Primitive Reflexes"}]:[]),
    ...(scores.dst||scores.vsms?[{id:"devt",label:"Dev. Screening"}]:[]),
    {id:"goals",label:"Goals & Therapy"},
    {id:"homeplan",label:"Home Plan"},
    {id:"narrative",label:"Clinical Narrative"},
  ];
  const copyReport=()=>{const t=`REHAB BUDDY CLINICAL REPORT\n${childName} | ${childAge} | ${new Date(date).toLocaleDateString("en-IN")}\n\n${narrative}\n\nGOALS:\n${goals.map((g,i)=>`${i+1}. [${g.service}] ${g.goal}`).join("\n")}`;navigator.clipboard.writeText(t).then(()=>notify("Report copied!")).catch(()=>notify("Copy failed","error"));};
  return(
    <div style={{padding:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <button className="rbtn rbtn-g" onClick={onBack}>← Back</button>
          <div><h1 className="rh" style={{fontSize:22,fontWeight:700,color:T.text}}>Clinical Report — {childName}</h1><div style={{display:"flex",gap:8,alignItems:"center",marginTop:4,flexWrap:"wrap"}}><span style={{fontSize:13,color:T.textMuted}}>{childAge} • {childGender} • {diagnosis||"No diagnosis"}</span><span style={{color:T.primary,fontSize:12}}>🩺 {therapistName||"Clinical Team"}</span><span style={{fontSize:12,color:T.textMuted}}>{new Date(date).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"})}</span></div></div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <button className="rbtn rbtn-g" onClick={copyReport}>📋 Copy Report</button>
          {(testsCompleted||[]).map(t=><span key={t} className="rtag" style={{background:T.primary+"22",color:T.primary}}>{t.toUpperCase()}</span>)}
        </div>
      </div>
      <div className="tbbar" style={{marginBottom:22}}>{TABS.map(t=><div key={t.id} className={`tb${tab===t.id?" active":""}`} onClick={()=>setTab(t.id)}>{t.label}</div>)}</div>

      {tab==="overview"&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:14,marginBottom:22}}>
            {scores.csp2&&Object.entries(scores.csp2.quadrantClassifications).map(([q,v])=>(
              <div key={q} className="scard" style={{borderLeft:`3px solid ${CHART_COLORS[q]}`}}>
                <div style={{fontSize:11,color:T.textMuted,fontWeight:500,marginBottom:6}}>CSP-2 — {q}</div>
                <div style={{marginBottom:4}}><span style={bandStyle(v)}>{v}</span></div>
                <div style={{fontSize:11,color:T.textMuted}}>{scores.csp2.quadrantScores[q]}/{CSP2_BANDS.Q[q]?.max}</div>
              </div>
            ))}
            {scores.vanderbilt&&<div className="scard" style={{borderLeft:`3px solid ${T.secondary}`}}><div style={{fontSize:11,color:T.textMuted,fontWeight:500,marginBottom:6}}>ADHD Screen</div><div style={{fontSize:13,fontWeight:600,color:scores.vanderbilt.adhdType!=="No Positive Screen"?T.accent:T.success}}>{scores.vanderbilt.adhdType}</div><div style={{fontSize:11,color:T.textMuted,marginTop:4}}>I:{scores.vanderbilt.inattentionCount}/9 • H:{scores.vanderbilt.hyperactiveCount}/9</div></div>}
            {scores.vsms&&<div className="scard" style={{borderLeft:`3px solid ${T.gold}`}}><div style={{fontSize:11,color:T.textMuted,fontWeight:500,marginBottom:6}}>Social Age (VSMS)</div><div style={{fontSize:22,fontWeight:700,color:T.gold}}>{Math.floor(scores.vsms.socialAgeMonths/12)}y {scores.vsms.socialAgeMonths%12}m</div><div style={{fontSize:12,color:T.textMuted}}>SQ: {scores.vsms.socialQuotient}</div></div>}
            {scores.primitiveReflexes&&<div className="scard" style={{borderLeft:`3px solid ${T.accent}`}}><div style={{fontSize:11,color:T.textMuted,fontWeight:500,marginBottom:6}}>Retained Reflexes</div><div style={{fontSize:22,fontWeight:700,color:T.accent}}>{Object.values(scores.primitiveReflexes).filter(v=>v==="retained").length}</div><div style={{fontSize:11,color:T.textMuted}}>+{Object.values(scores.primitiveReflexes).filter(v=>v==="partial").length} partial</div></div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
            {scores.nicrca&&<div className="rc" style={{padding:24}}><h3 className="rh" style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:14}}>NICRCA Domain Profile</h3><ResponsiveContainer width="100%" height={260}><RadarChart data={NICRCA_DOMAINS.map(d=>({subject:d.name.split(" ")[0],score:scores.nicrca[d.id]?.pct||0,fullMark:100}))}><PolarGrid stroke={T.border}/><PolarAngleAxis dataKey="subject" tick={{fill:T.textMuted,fontSize:11}}/><PolarRadiusAxis angle={30} domain={[0,100]} tick={{fill:T.textFaint,fontSize:9}}/><Radar name="%" dataKey="score" stroke={T.primary} fill={T.primary} fillOpacity={0.3}/><Tooltip contentStyle={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,color:T.text}} formatter={v=>`${v}%`}/></RadarChart></ResponsiveContainer></div>}
            {scores.csp2&&<div className="rc" style={{padding:24}}><h3 className="rh" style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:14}}>CSP-2 Domain Scores</h3><ResponsiveContainer width="100%" height={260}><BarChart layout="vertical" data={Object.entries(scores.csp2.domainScores).map(([k,v])=>({name:k.length>10?k.slice(0,10)+"…":k,score:v,max:CSP2_BANDS.D[k]?.max||50}))} margin={{left:10,right:20}}><CartesianGrid strokeDasharray="3 3" stroke={T.border}/><XAxis type="number" tick={{fill:T.textMuted,fontSize:10}}/><YAxis type="category" dataKey="name" width={72} tick={{fill:T.textMuted,fontSize:10}}/><Tooltip contentStyle={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,color:T.text}}/><Bar dataKey="score" fill={T.secondary} radius={[0,4,4,0]}/></BarChart></ResponsiveContainer></div>}
          </div>
          <div className="rc" style={{padding:22}}>
            <h3 className="rh" style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:14}}>Priority Goals Summary ({goals.length} goals generated)</h3>
            {goals.filter(g=>g.priority==="High").slice(0,5).map((g,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:8,padding:"10px 14px",background:T.bgCard2,borderRadius:8,borderLeft:`3px solid ${T.accent}`}}>
                <span className="rtag" style={{background:`${T.accent}22`,color:T.accent,flexShrink:0,marginTop:2,height:"fit-content"}}>HIGH</span>
                <div><div style={{fontSize:11,color:T.primary,marginBottom:2,fontWeight:600}}>{g.domain} — {g.service}</div><div style={{fontSize:13,color:T.text}}>{g.goal}</div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="csp2"&&scores.csp2&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
            <div className="rc" style={{padding:24}}>
              <h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Quadrant Profile — Dunn's Model</h3>
              <ResponsiveContainer width="100%" height={260}><RadarChart data={Object.entries(scores.csp2.quadrantScores).map(([q,v])=>({subject:q,score:v,fullMark:CSP2_BANDS.Q[q]?.max||100}))}><PolarGrid stroke={T.border}/><PolarAngleAxis dataKey="subject" tick={{fill:T.textMuted,fontSize:12}}/><PolarRadiusAxis angle={30} domain={[0,110]} tick={{fill:T.textFaint,fontSize:9}}/><Radar name="Raw Score" dataKey="score" stroke={T.primary} fill={T.primary} fillOpacity={0.3}/><Tooltip contentStyle={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,color:T.text}}/></RadarChart></ResponsiveContainer>
            </div>
            <div className="rc" style={{padding:24}}>
              <h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Quadrant Classification Summary</h3>
              {Object.entries(scores.csp2.quadrantClassifications).map(([q,v])=>(
                <div key={q} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:13,fontWeight:600,color:T.text,display:"flex",alignItems:"center",gap:6}}><span style={{width:10,height:10,background:CHART_COLORS[q],borderRadius:"50%",display:"inline-block"}}/>{q}</span><span style={bandStyle(v)}>{v}</span></div>
                  <div className="pb"><div className="pf" style={{width:`${Math.round((scores.csp2.quadrantScores[q]/(CSP2_BANDS.Q[q]?.max||100))*100)}%`,background:CHART_COLORS[q]}}/></div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}><span style={{fontSize:10,color:T.textMuted}}>Raw: {scores.csp2.quadrantScores[q]}</span><span style={{fontSize:10,color:T.textMuted}}>Max: {CSP2_BANDS.Q[q]?.max}</span></div>
                </div>
              ))}
              <div style={{marginTop:10,padding:"10px 12px",background:`${T.primary}10`,borderRadius:8,fontSize:11,color:T.textMuted}}><strong style={{color:T.primary}}>Dunn's Model:</strong> Seeking=obtains | Avoiding=bothered | Sensitivity=detects | Registration=misses</div>
            </div>
          </div>
          <div className="rc" style={{padding:24,marginBottom:18}}>
            <h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Domain Classification Table</h3>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr style={{borderBottom:`1px solid ${T.border}`}}>{["Domain","Raw Score","Max","Classification"].map(h=><th key={h} style={{padding:"8px 12px",textAlign:"left",color:T.textMuted,fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"}}>{h}</th>)}</tr></thead>
                <tbody>
                  {Object.entries(scores.csp2.domainScores).map(([d,v])=>{const cl=scores.csp2.domainClassifications[d];const max=CSP2_BANDS.D[d]?.max;return(
                    <tr key={d} style={{borderBottom:`1px solid ${T.border}`}}>
                      <td style={{padding:"10px 12px",fontWeight:500,color:T.text}}>{d}</td>
                      <td style={{padding:"10px 12px",color:T.primary,fontWeight:700}}>{v}</td>
                      <td style={{padding:"10px 12px",color:T.textMuted}}>{max||"—"}</td>
                      <td style={{padding:"10px 12px"}}><span style={bandStyle(cl)}>{cl}</span></td>
                    </tr>
                  );})}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab==="vand"&&scores.vanderbilt&&(
        <div>
          <div className="rc" style={{padding:24,marginBottom:18,borderLeft:`4px solid ${scores.vanderbilt.adhdType!=="No Positive Screen"?T.accent:T.success}`}}>
            <h3 className="rh" style={{fontSize:16,fontWeight:700,color:scores.vanderbilt.adhdType!=="No Positive Screen"?T.accent:T.success,marginBottom:14}}>Screen Result: {scores.vanderbilt.adhdType}</h3>
            <div className="g4" style={{gap:14}}>
              {[[`Inattention ${scores.vanderbilt.inattentionCount}/9`,scores.vanderbilt.inattentionCount>=6?T.accent:T.success,"≥6 = positive screen"],[`Hyperactivity ${scores.vanderbilt.hyperactiveCount}/9`,scores.vanderbilt.hyperactiveCount>=6?T.accent:T.success,"≥6 = positive screen"],[`ODD ${scores.vanderbilt.oddCount}/8`,scores.vanderbilt.oddPositive?T.accent:T.success,"≥4 = positive"],[`Anxiety Score: ${scores.vanderbilt.anxietyScore}`,scores.vanderbilt.anxietyPositive?T.warning:T.success,"Mood screen"]].map(([label,color,note],i)=>(
                <div key={i} style={{background:T.bgCard2,borderRadius:10,padding:14,textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color,marginBottom:6}}>{label}</div><div style={{fontSize:11,color:T.textFaint}}>{note}</div></div>
              ))}
            </div>
            <div style={{marginTop:12,fontSize:12,color:T.textMuted,padding:"8px 12px",background:T.bgCard2,borderRadius:8}}>⚠ Vanderbilt results are a screening tool only. Diagnosis of ADHD requires comprehensive evaluation by a qualified physician.</div>
          </div>
          <div className="rc" style={{padding:24}}>
            <h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Subscale Score Chart</h3>
            <ResponsiveContainer width="100%" height={200}><BarChart data={[{name:"Inattention",score:scores.vanderbilt.inattentionScore,max:27},{name:"Hyperactivity",score:scores.vanderbilt.hyperactiveScore,max:27},{name:"ODD",score:scores.vanderbilt.oddScore,max:24},{name:"Anxiety/Mood",score:scores.vanderbilt.anxietyScore,max:21}]}><CartesianGrid strokeDasharray="3 3" stroke={T.border}/><XAxis dataKey="name" tick={{fill:T.textMuted,fontSize:12}}/><YAxis tick={{fill:T.textMuted,fontSize:10}}/><Tooltip contentStyle={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,color:T.text}}/><Legend wrapperStyle={{color:T.textMuted,fontSize:12}}/><Bar dataKey="score" name="Score" fill={T.secondary} radius={[4,4,0,0]}/><Bar dataKey="max" name="Max" fill={T.border} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
          </div>
        </div>
      )}

      {tab==="nicrca"&&scores.nicrca&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
            <div className="rc" style={{padding:24}}><h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Domain Radar</h3><ResponsiveContainer width="100%" height={280}><RadarChart data={NICRCA_DOMAINS.map(d=>({subject:d.name.split(" ")[0],A:scores.nicrca[d.id]?.pct||0,fullMark:100}))}><PolarGrid stroke={T.border}/><PolarAngleAxis dataKey="subject" tick={{fill:T.textMuted,fontSize:11}}/><PolarRadiusAxis domain={[0,100]} tick={{fill:T.textFaint,fontSize:9}}/><Radar name="% Score" dataKey="A" stroke={T.primary} fill={T.primary} fillOpacity={0.35}/><Tooltip contentStyle={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,color:T.text}} formatter={v=>`${v}%`}/></RadarChart></ResponsiveContainer></div>
            <div className="rc" style={{padding:24}}><h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Domain Status</h3>
              {NICRCA_DOMAINS.map(d=>{const s=scores.nicrca[d.id];const pct=s?.pct||0;const color=urgencyColor(pct);return(
                <div key={d.id} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:T.text,display:"flex",gap:5}}><span>{d.icon}</span>{d.name}</span><div style={{display:"flex",gap:8}}><span style={{fontSize:12,color,fontWeight:600}}>{s?.level}</span><span style={{fontSize:13,fontWeight:700,color}}>{pct}%</span></div></div>
                  <div className="pb"><div className="pf" style={{width:`${pct}%`,background:color}}/></div>
                </div>
              );})}
              <div style={{marginTop:10,fontSize:11,color:T.textMuted,display:"flex",gap:12,flexWrap:"wrap"}}><span style={{color:T.success}}>■ ≥80% Functional</span><span style={{color:T.warning}}>■ 65-79% Mild</span><span style={{color:T.accent}}>■ 50-64% Moderate</span><span style={{color:T.error}}>■ &lt;50% Significant</span></div>
            </div>
          </div>
        </div>
      )}

      {tab==="reflexes"&&scores.primitiveReflexes&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>
            {STATUS_OPTS.map(s=>{const cnt=Object.values(scores.primitiveReflexes).filter(v=>v===s.v).length;return<div key={s.v} className="scard" style={{borderLeft:`3px solid ${s.c}`,textAlign:"center"}}><div style={{fontSize:11,color:T.textMuted,marginBottom:6}}>{s.l}</div><div style={{fontSize:28,fontWeight:700,color:s.c}}>{cnt}</div></div>;})}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {PRIM_REFLEXES.map(r=>{const status=scores.primitiveReflexes[r.id]||"not_tested";const cmap={integrated:T.success,partial:T.warning,retained:T.error,not_tested:T.textFaint};const lmap={integrated:"Integrated ✓",partial:"Partially Retained ⚡",retained:"Fully Retained ⚠",not_tested:"Not Tested"};const c=cmap[status];return(
              <div key={r.id} className="rc" style={{padding:14,borderLeft:`4px solid ${c}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}><span style={{fontSize:14,fontWeight:600,color:T.text}}>{r.name}</span><span className="rtag" style={{background:`${c}22`,color:c}}>{lmap[status]}</span></div><div style={{fontSize:11,color:T.textMuted}}>Expected: <strong style={{color:T.primary}}>{r.int}</strong></div>{(status==="retained"||status==="partial")&&<div style={{fontSize:11,color:T.accent,marginTop:3}}>Impact: {r.impact}</div>}</div>
                </div>
              </div>
            );})}
          </div>
        </div>
      )}

      {tab==="devt"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
          {scores.dst&&<div className="rc" style={{padding:24}}><h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Developmental Screening Test (DST)</h3><div style={{textAlign:"center",marginBottom:18}}><div style={{fontSize:48,fontWeight:700,color:T.primary}}>{scores.dst.percentage}%</div><div style={{color:T.textMuted,fontSize:13}}>{scores.dst.passedCount}/{scores.dst.total} milestones passed</div></div><div className="pb" style={{height:10}}><div className="pf" style={{width:`${scores.dst.percentage}%`,background:urgencyColor(scores.dst.percentage)}}/></div><div style={{marginTop:12,fontSize:12,color:T.textMuted}}>{scores.dst.percentage>=80?"Milestone attainment within expected range.":scores.dst.percentage>=60?"Mild delays noted.":"Significant delays — comprehensive evaluation recommended."}</div></div>}
          {scores.vsms&&<div className="rc" style={{padding:24}}><h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Vineland Social Maturity Scale (VSMS)</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}><div style={{textAlign:"center",padding:16,background:T.bgCard2,borderRadius:10}}><div style={{fontSize:11,color:T.textMuted,marginBottom:6}}>Social Age (SA)</div><div style={{fontSize:24,fontWeight:700,color:T.gold}}>{Math.floor(scores.vsms.socialAgeMonths/12)}y {scores.vsms.socialAgeMonths%12}m</div></div><div style={{textAlign:"center",padding:16,background:T.bgCard2,borderRadius:10}}><div style={{fontSize:11,color:T.textMuted,marginBottom:6}}>Social Quotient (SQ)</div><div style={{fontSize:24,fontWeight:700,color:scores.vsms.socialQuotient>=85?T.success:scores.vsms.socialQuotient>=70?T.warning:T.error}}>{scores.vsms.socialQuotient}</div></div></div><div style={{fontSize:12,color:T.textMuted,padding:"10px 12px",background:T.bgCard2,borderRadius:8}}>{scores.vsms.socialQuotient>=85?"Normal range (SQ ≥85)":scores.vsms.socialQuotient>=70?"Mild delay (SQ 70-84)":scores.vsms.socialQuotient>=55?"Moderate delay (SQ 55-69)":"Severe delay (SQ <55)"}</div></div>}
        </div>
      )}

      {tab==="goals"&&(
        <div>
          {["High","Medium"].map(priority=>{const filtered=goals.filter(g=>g.priority===priority);if(!filtered.length)return null;const color={High:T.error,Medium:T.warning}[priority];return(
            <div key={priority} style={{marginBottom:22}}>
              <h3 className="rh" style={{fontSize:14,fontWeight:600,color,marginBottom:10}}>{priority} Priority Goals ({filtered.length})</h3>
              {filtered.map((g,i)=>(
                <div key={i} style={{padding:"14px 18px",background:T.bgCard,border:`1px solid ${T.border}`,borderLeft:`4px solid ${color}`,borderRadius:"0 8px 8px 0",marginBottom:8}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}><span className="rtag" style={{background:`${T.primary}22`,color:T.primary}}>{g.service}</span><span style={{fontSize:12,color:T.secondary,fontWeight:600}}>{g.domain}</span></div>
                  <div style={{fontSize:13,color:T.text,lineHeight:1.6}}>{g.goal}</div>
                </div>
              ))}
            </div>
          );})}
          <div className="rc" style={{padding:22,marginTop:14}}>
            <h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Therapy Service Recommendations</h3>
            <div className="g3" style={{gap:12}}>
              {[{svc:"Occupational Therapy",desc:"Sensory integration, fine motor, ADL, reflex integration",color:T.primary},{svc:"Speech-Language Therapy",desc:"Oral motor, articulation, language, social communication",color:T.secondary},{svc:"ABA Therapy",desc:"Behavior, attention, social skills, daily living",color:T.gold},{svc:"Physiotherapy",desc:"Gross motor, postural control, gait training",color:T.purple},{svc:"Special Education",desc:"Academic, cognitive, learning support",color:T.success},{svc:"Parent Training",desc:"Home program, environmental modification",color:T.accent}].map(s=>(
                <div key={s.svc} style={{padding:14,background:T.bgCard2,borderRadius:10,borderTop:`3px solid ${s.color}`}}><div style={{fontSize:12,fontWeight:600,color:T.text,marginBottom:4}}>{s.svc}</div><div style={{fontSize:11,color:T.textMuted}}>{s.desc}</div></div>
              ))}
            </div>
          </div>
          <div className="rc" style={{padding:22,marginTop:14}}>
            <h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text,marginBottom:14}}>Report Components (Whiteboard Framework)</h3>
            <div className="g2" style={{gap:10}}>
              {[["🔍","Root Cause (Etiology)",assessment.diagnosis||"See narrative"],["📊","Intervention Hierarchy","Sensory → Motor → ADL → Language → Social → Cognitive → Academic"],["⏱","Therapy Intensity","See service recommendations above"],["🏥","Associated Medical Intervention","Refer to developmental pediatrician"],["👨‍👩‍👧","Parent Training (Environmental)","Weekly parent sessions + home program"],["📅","Timeline","3-month review, re-assessment at 6 months"],["📈","Prognosis","Good with early, intensive, multidisciplinary intervention"]].map(([icon,label,desc])=>(
                <div key={label} style={{display:"flex",gap:10,padding:"10px 14px",background:T.bgCard2,borderRadius:8}}><span style={{fontSize:16,flexShrink:0}}>{icon}</span><div><div style={{fontSize:12,fontWeight:600,color:T.text,marginBottom:2}}>{label}</div><div style={{fontSize:11,color:T.textMuted}}>{desc}</div></div></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==="homeplan"&&<HomePlanSection assessment={assessment}/>}

      {tab==="narrative"&&(
        <div className="rc" style={{padding:28}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}><h3 className="rh" style={{fontSize:15,fontWeight:600,color:T.text}}>Auto-Generated Clinical Narrative</h3><button className="rbtn rbtn-g" onClick={()=>{navigator.clipboard.writeText(narrative);notify("Narrative copied!");}}>📋 Copy</button></div>
          <div style={{padding:"20px 24px",background:T.bgCard2,borderRadius:10,borderLeft:`4px solid ${T.primary}`}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:14,lineHeight:2,color:T.text}}>
              <div style={{marginBottom:18,padding:"8px 12px",background:`${T.primary}10`,borderRadius:6,fontSize:11,color:T.primary,fontWeight:500}}>Rehab Buddy Child Development Centre & Autism Research Institute | Comprehensive Neurodevelopmental Assessment Report</div>
              {narrative.split("\n\n").map((para,i)=><p key={i} style={{marginBottom:14,textAlign:"justify"}}>{para.split("**").map((part,j)=>j%2===1?<strong key={j} style={{color:T.primary}}>{part}</strong>:part)}</p>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ──── HOME PLAN ────
function HomePlanSection({assessment}){
  const{scores,childName,childAge}=assessment;
  const plan=[];
  if(scores.csp2){
    const qc=scores.csp2.quadrantClassifications;
    if(qc.Seeking==="More Than Others"||qc.Seeking==="Much More Than Others"){plan.push({domain:"Sensory Diet",time:"Morning",activity:"Heavy work before school: push/pull activities, carrying books/water, animal walks for 5-10 min",materials:"Resistance bands, heavy backpack, therapy ball"});plan.push({domain:"Sensory Diet",time:"After school",activity:"Scheduled movement breaks: jumping on trampoline, wall push-ups, chair push-ups every 45 min",materials:"Mini trampoline or outdoor play"});}
    if(qc.Avoiding==="More Than Others"||qc.Avoiding==="Much More Than Others")plan.push({domain:"Sensory Desensitization",time:"Daily",activity:"Gradual exposure to challenging textures during play. Use deep pressure before grooming. Warn child before touch.",materials:"Textured materials, sensory bins, soft brushes"});
    if(scores.csp2.domainClassifications["ORAL SENSORY"]==="More Than"||scores.csp2.domainClassifications["ORAL SENSORY"]==="Much More")plan.push({domain:"Oral Motor",time:"Meal times",activity:"Chewy tools before meals. Offer crunchy/resistive foods. Blowing, sucking, chewing resistive foods",materials:"Chewy tubes, straws, resistive foods"});
  }
  if(scores.vanderbilt&&scores.vanderbilt.adhdType!=="No Positive Screen"){
    plan.push({domain:"Attention",time:"Homework time",activity:"Use timer (15min work/5min break). Remove distractions. Seat child facing blank wall. Fidget tool.",materials:"Visual timer, fidget tool, noise-cancelling headphones"});
    plan.push({domain:"Behavior",time:"Throughout day",activity:"Clear visual schedule on wall. Give 2-choice instructions. Catch child being good — specific immediate praise.",materials:"Visual schedule cards, reward chart"});
  }
  if(scores.nicrca){
    if(scores.nicrca.phys?.pct<75)plan.push({domain:"Motor Skills",time:"Evening",activity:"Fine motor: threading beads, playdough, scissor cutting. Gross motor: obstacle course, hop scotch, catching ball",materials:"Playdough, beads, scissors, ball"});
    if(scores.nicrca.lang?.pct<75)plan.push({domain:"Language",time:"Daily play",activity:"Read together 20 min/day. Comment on daily activities. Follow child's lead in play.",materials:"Age-appropriate books, puppets"});
    if(scores.nicrca.soc?.pct<75)plan.push({domain:"Social Skills",time:"Weekend",activity:"Arrange 1 structured playdate per week. Practice turn-taking with board games. Emotion labelling.",materials:"Board games, emotion cards"});
    if(scores.nicrca.adl?.pct<75)plan.push({domain:"Self-Care",time:"Morning/Evening",activity:"Visual self-care routine: wake → toilet → brush teeth → wash face → dress. Backward chaining.",materials:"Visual routine chart, picture cards"});
  }
  if(scores.primitiveReflexes&&Object.entries(scores.primitiveReflexes).filter(([,v])=>v==="retained"||v==="partial").length>0)plan.push({domain:"Reflex Integration",time:"Daily 10 min",activity:"Primitive reflex integration exercises as prescribed by OT. Consult therapist for specific program before starting.",materials:"Exercise mat — do NOT attempt without professional guidance"});
  plan.push({domain:"Sleep Hygiene",time:"Evening",activity:"No screens 1h before bed. Weighted blanket if tolerated. Consistent bedtime. Calming music/white noise.",materials:"Weighted blanket, sleep routine visual"});
  const DC={Sensory Diet:T.primary,Oral Motor:T.gold,Attention:T.purple,Behavior:T.accent,"Motor Skills":T.seeking,Language:T.avoiding,"Social Skills":T.pink,"Self-Care":T.success,"Reflex Integration":T.error,"Sleep Hygiene":T.warning,"Sensory Desensitization":T.secondary};
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div><h3 className="rh" style={{fontSize:16,fontWeight:600,color:T.text}}>Home Plan — {childName} ({childAge})</h3><p style={{fontSize:13,color:T.textMuted,marginTop:4}}>Auto-generated from assessment findings. Therapist must review and customize before sharing with family.</p></div>
        <button className="rbtn rbtn-g" onClick={()=>{const t=plan.map(p=>`[${p.time}] ${p.domain}: ${p.activity}\nMaterials: ${p.materials}`).join("\n\n");navigator.clipboard.writeText(t);}}>📋 Copy Plan</button>
      </div>
      <div style={{background:`${T.warning}15`,border:`1px solid ${T.warning}33`,borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:12,color:T.warning}}>⚠ AI-generated outline — must be reviewed, customized, and approved by the treating therapist before sharing with families.</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {plan.map((item,i)=>{const color=DC[item.domain]||T.primary;return(
          <div key={i} className="rc" style={{padding:16,borderLeft:`4px solid ${color}`}}>
            <div style={{display:"flex",gap:10}}>
              <div style={{flexShrink:0,display:"flex",flexDirection:"column",gap:5}}><span className="rtag" style={{background:`${color}22`,color,fontSize:11,fontWeight:700}}>{item.domain}</span><span style={{fontSize:11,padding:"3px 8px",background:T.bgCard2,borderRadius:12,color:T.textMuted,textAlign:"center"}}>⏰ {item.time}</span></div>
              <div style={{flex:1}}><div style={{fontSize:13,color:T.text,lineHeight:1.7,marginBottom:6}}>{item.activity}</div><div style={{fontSize:11,color:T.textMuted}}><span style={{color:T.primary,fontWeight:600}}>Materials:</span> {item.materials}</div></div>
            </div>
          </div>
        );})}
      </div>
    </div>
  );
}

// ──── REPORTS LIST ────
function ReportsListView({assessments,children,onView}){
  const[search,setSearch]=useState("");
  const filtered=[...assessments].filter(a=>a.childName?.toLowerCase().includes(search.toLowerCase())).sort((a,b)=>new Date(b.date)-new Date(a.date));
  return(
    <div style={{padding:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <h1 className="rh" style={{fontSize:22,fontWeight:700,color:T.text}}>Assessment Reports</h1>
        <div style={{position:"relative"}}><input className="rin" style={{paddingLeft:36,width:240}} placeholder="Search by name…" value={search} onChange={e=>setSearch(e.target.value)}/><span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:T.textFaint}}>🔍</span></div>
      </div>
      {filtered.length===0?<div className="rc" style={{padding:60,textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>📋</div><h2 style={{color:T.textMuted}}>No reports found</h2></div>:(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(a=>(
            <div key={a.id} className="rc" style={{padding:18,cursor:"pointer"}} onClick={()=>onView(a)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:T.primary+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{a.childGender==="Female"?"👧":"👦"}</div>
                  <div><div style={{fontSize:15,fontWeight:600,color:T.text}}>{a.childName}</div><div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{a.childAge} • {a.diagnosis||"No diagnosis"} • {a.therapistName}</div><div style={{display:"flex",gap:6,marginTop:5}}>{(a.testsCompleted||[]).map(t=><span key={t} className="rtag" style={{background:T.primary+"22",color:T.primary,fontSize:10}}>{t.toUpperCase()}</span>)}</div></div>
                </div>
                <div style={{textAlign:"right"}}><div style={{fontSize:12,color:T.textMuted}}>{new Date(a.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</div><div style={{fontSize:12,color:T.primary,marginTop:6}}>View Report →</div></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ──── HOME PLAN VIEW ────
function HomePlanView({assessments}){
  const[sel,setSel]=useState(null);
  const latest=[...assessments].sort((a,b)=>new Date(b.date)-new Date(a.date));
  return(
    <div style={{padding:28}}>
      <h1 className="rh" style={{fontSize:22,fontWeight:700,color:T.text,marginBottom:8}}>Home Plans</h1>
      <p style={{color:T.textMuted,fontSize:13,marginBottom:22}}>Select an assessment to view its auto-generated home plan</p>
      {!sel?(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {latest.length===0&&<div className="rc" style={{padding:60,textAlign:"center"}}><div style={{fontSize:48,marginBottom:14}}>🏠</div><div style={{color:T.textMuted}}>No assessments yet. Complete an assessment to generate a home plan.</div></div>}
          {latest.map(a=><div key={a.id} className="rc" style={{padding:16,cursor:"pointer"}} onClick={()=>setSel(a)}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:15,fontWeight:600,color:T.text}}>{a.childName}</div><div style={{fontSize:12,color:T.textMuted}}>{a.childAge} • {new Date(a.date).toLocaleDateString("en-IN")}</div></div><span style={{color:T.primary,fontSize:13}}>Open Plan →</span></div></div>)}
        </div>
      ):(
        <div><button className="rbtn rbtn-g" style={{marginBottom:18}} onClick={()=>setSel(null)}>← Back to list</button><HomePlanSection assessment={sel}/></div>
      )}
    </div>
  );
}

// ──── TEAM VIEW ────
function TeamView({user,notify}){
  return(
    <div style={{padding:28}}>
      <h1 className="rh" style={{fontSize:22,fontWeight:700,color:T.text,marginBottom:8}}>Team Management</h1>
      <p style={{color:T.textMuted,fontSize:13,marginBottom:22}}>Manage access credentials for your clinical team</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12,marginBottom:26}}>
        {SYSTEM_USERS.map(u=>(
          <div key={u.id} className="rc" style={{padding:18,borderLeft:u.role==="admin"?`3px solid ${T.primary}`:`3px solid ${T.border}`}}>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:`${T.primary}22`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:T.primary,fontSize:14}}>{u.initials}</div>
              <div><div style={{fontSize:15,fontWeight:600,color:T.text}}>{u.name}</div><div style={{fontSize:12,color:T.textMuted}}>{u.title}</div></div>
              {u.role==="admin"&&<span className="rtag" style={{background:`${T.primary}22`,color:T.primary,marginLeft:"auto"}}>Admin</span>}
            </div>
            <div style={{fontSize:12,color:T.textMuted,background:T.bgCard2,borderRadius:8,padding:"8px 12px"}}><div>{u.email}</div><div style={{color:T.textFaint}}>Password: {u.password}</div></div>
          </div>
        ))}
      </div>
      <div className="rc" style={{padding:22}}>
        <h2 className="rh" style={{fontSize:16,fontWeight:600,color:T.text,marginBottom:14}}>Share Dashboard with Team</h2>
        <div style={{background:T.bgCard2,borderRadius:10,padding:18,marginBottom:14}}>
          {[["1","Export","Download the dashboard files from Claude"],["2","Host on Netlify/Vercel (Free)","Create a React app, add files, deploy in minutes"],["3","Share the URL","Send the hosted URL — team logs in with credentials above"],["4","For patient data","Add Supabase/Firebase backend for persistent multi-user data"]].map(([n,t,d])=>(
            <div key={n} style={{display:"flex",gap:12,marginBottom:10}}><div style={{width:24,height:24,borderRadius:"50%",background:T.primary,color:"#030D16",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{n}</div><div><div style={{fontSize:13,fontWeight:600,color:T.text}}>{t}</div><div style={{fontSize:12,color:T.textMuted}}>{d}</div></div></div>
          ))}
        </div>
        <div style={{background:`${T.primary}10`,border:`1px solid ${T.primary}33`,borderRadius:8,padding:"12px 14px",fontSize:12,color:T.textMuted}}><strong style={{color:T.primary}}>For IP/Patent protection:</strong> Document your NICRCA framework and assessment hierarchy. File with IP India (ipindia.gov.in) under copyright. Consider trademarking "Rehab Buddy NICRCA" as a proprietary assessment tool. Consult an IP attorney for patent filing guidance.</div>
      </div>
    </div>
  );
}

// ──── MAIN APP ────
export default function App(){
  const[user,setUser]=useState(null);
  const[view,setView]=useState("login");
  const[children,setChildren]=useState([]);
  const[assessments,setAssessments]=useState([]);
  const[wizardState,setWizardState]=useState(null);
  const[activeReport,setActiveReport]=useState(null);
  const[notification,setNotification]=useState(null);
  const[collapsed,setCollapsed]=useState(false);

  useEffect(()=>{
    const init=async()=>{
      try{
        const sess=await window.storage.get("rb_session");
        if(sess){setUser(JSON.parse(sess.value));setView("dashboard");}
        const ch=await window.storage.get("rb_children");
        if(ch)setChildren(JSON.parse(ch.value));
        const as=await window.storage.get("rb_assessments");
        if(as)setAssessments(JSON.parse(as.value));
      }catch(e){}
    };
    init();
  },[]);

  const saveChildren=async d=>{setChildren(d);await window.storage.set("rb_children",JSON.stringify(d));};
  const saveAssessments=async d=>{setAssessments(d);await window.storage.set("rb_assessments",JSON.stringify(d));};
  const notify=(msg,type="success")=>{setNotification({msg,type});setTimeout(()=>setNotification(null),3500);};
  const login=async u=>{setUser(u);await window.storage.set("rb_session",JSON.stringify(u));setView("dashboard");};
  const logout=async()=>{setUser(null);await window.storage.delete("rb_session");setView("login");};
  const navTo=v=>{setView(v);setActiveReport(null);};

  return(
    <>
      <style>{CSS}</style>
      <div className="rb" style={{minHeight:"100vh"}}>
        {notification&&<div className="notif" style={{background:notification.type==="success"?T.success:T.error,color:"#fff"}}>{notification.msg}</div>}
        {view==="login"?<LoginScreen onLogin={login}/>:(
          <div style={{display:"flex",height:"100vh",overflow:"hidden"}}>
            <Sidebar user={user} view={view} onNav={navTo} onLogout={logout} collapsed={collapsed} onToggle={()=>setCollapsed(v=>!v)} assessments={assessments} children={children}/>
            <main style={{flex:1,overflow:"auto"}} className="rscroll">
              {view==="dashboard"&&<DashboardView user={user} children={children} assessments={assessments} onNewAssessment={()=>{setWizardState({step:0,childId:null,selectedTests:[],responses:{},scores:{}});setView("wizard");}} onViewReport={a=>{setActiveReport(a);setView("report");}} notify={notify}/>}
              {view==="children"&&<ChildrenView children={children} onSave={saveChildren} notify={notify}/>}
              {view==="wizard"&&<AssessmentWizard children={children} state={wizardState} setState={setWizardState} onComplete={async a=>{const u=[...assessments,a];await saveAssessments(u);setActiveReport(a);setView("report");notify("Assessment complete & report generated!");}} onBack={()=>setView("dashboard")} notify={notify}/>}
              {view==="report"&&activeReport&&<ReportView assessment={activeReport} onBack={()=>setView("dashboard")} notify={notify}/>}
              {view==="reports"&&<ReportsListView assessments={assessments} children={children} onView={a=>{setActiveReport(a);setView("report");}}/>}
              {view==="homeplan"&&<HomePlanView assessments={assessments} children={children}/>}
              {view==="team"&&<TeamView user={user} notify={notify}/>}
            </main>
          </div>
        )}
      </div>
    </>
  );
}
