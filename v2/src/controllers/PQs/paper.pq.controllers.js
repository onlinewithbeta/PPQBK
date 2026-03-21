//Get the exampaper
import gen from "../../functions/generate/gen.functions.js";
import saveFunctions from "../../functions/mongoose/save.functions.js";
import usersFunctions from "../../functions/users/users.functions.js";
import {
 selectAccesscode,
 createPqFiles
} from "../../functions/pq/pqdb.functions.js";
import cfg from "../../cfg.js";

//function to get the required paper
export default async function paper(req, res) {
 //Extract the Course and session wanted.
 const course = req.query.course;
 let session = req.query.session;

 if (session.includes("/")) session = session.split("/").join("_");

 //Available Courses update initiated"
 console.log(`Fetching exam paper for ${course} ${session}.`);

 try {
  //fetch the course here
  const currentAccessCode = await selectAccesscode(); //Get accesscode
  const pqFile = createPqFiles(currentAccessCode); //Creater Paper getter
  const examPaper = await pqFile.get(`/${course}/main/${session}.json`); //make the request
  /*   const examPaper = {
   data: [
    {
     type: "pageInfo",
     kind: "pureOBJ",
     course_title: "Organic Chemistry I",
     code: "CHM 260.1",
     session: "2023/2024",
     topics: [
      "Electronic Effects",
      "Amines",
      "Basicity",
      "Esters",
      "Reaction Types",
      "Acidity and Basicity",
      "Organometallic Compounds",
      "Alkyl Halides",
      "Physical Properties",
      "Isomerism",
      "Reaction Mechanisms",
      "Nucleophilic Substitution",
      "Nitriles",
      "Nomenclature",
      "Esterification",
      "Carboxylic Acids",
      "Conformational Analysis",
      "Cycloalkanes",
      "Sulfur Compounds",
      "Elimination Reactions",
      "Alcohols",
      "Stereochemistry",
      "Chirality",
      "Geometric Isomerism",
      "Acyl Halides",
      "Ethers and Alcohols",
      "Reduction Reactions",
      "Substitution Reactions",
      "Optical Isomerism",
      "Aldehydes",
      "Meso Compounds",
      "Oxidation Reactions",
      "Aldehydes and Ketones",
      "Ketones",
      "Fischer Projection",
      "Intermolecular Forces",
      "Phenols",
      "Grignard Reagents",
      "Aromatic Compounds",
      "Electrophilic Substitution"
     ],
     time: "90"
    },

    {
     type: "Instruction",
     content: "Attempt All Questions"
    },
    {
     type: "Question",
     name: "Question 1",
     topic: ["Electronic Effects"],
     Question: {
      content:
       "What is the name of the type of bond through which inductive effects are transmitted in organic molecules?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Sigma (\\(\\sigma\\)) bond"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Understanding Inductive Effect</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>What is it?</strong><br>\n    The inductive effect is the 'pulling' or 'pushing' of electrons through a chain of atoms. Imagine a game of tug-of-war where a very strong atom (like Chlorine) pulls the electron cloud toward itself.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>The Medium</strong><br>\n    This effect only travels through <strong>single covalent bonds</strong>, which chemists call <strong>Sigma (\\(\\sigma\\)) bonds</strong>. It does not happen through double bonds (pi bonds) in the same way.\n  </div>\n\n  \n\n  <div style='background: var(--cAnsBg); color: var(--cAns); padding: 12px; border-radius: 6px; border-left: 4px solid var(--cAns); margin-top: 15px;'>\n    <strong>✓ Key Takeaway:</strong> Inductive effect = electron shift through \\(\\sigma\\) bonds.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 2",
     topic: ["Amines", "Basicity"],
     Question: {
      content:
       "Arrange the following amines in an increasing order of basic strength: \\(CH_3NH_2\\), \\((CH_3CH_2)_2NH\\), and \\(CH_3CH_2NH_2\\).",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\(CH_3NH_2 <CH_3CH_2NH_2 < (CH_3CH_2)_2NH\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Basicity of Amines</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>The Rule</strong><br>\n    Amines are basic because the Nitrogen atom has a 'lone pair' of electrons it wants to share. Anything that pushes more electrons toward the Nitrogen makes it <strong>stronger</strong> (more basic).\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>Step 1: Compare Chain Length</strong><br>\n    Ethyl groups (\\(C_2H_5\\)) push electrons better than Methyl groups (\\(CH_3\\)). So, Ethylamine is stronger than Methylamine.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>Step 2: Compare Number of Groups</strong><br>\n    Diethylamine \\((CH_3CH_2)_2NH\\) has two ethyl groups pushing electrons, making it the strongest base in this list.\n  </div>\n\n  <div style='background: var(--cAnsBg); color: var(--cAns); padding: 12px; border-radius: 6px; border-left: 4px solid var(--cAns); margin-top: 15px;'>\n    <strong>Order:</strong> Methylamine < Ethylamine < Diethylamine\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 3",
     topic: ["Esters", "Reaction Types"],
     Question: {
      content:
       "What is the specific name given to the base-catalyzed hydrolysis of an ester?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Saponification"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Soap Making Basics</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    When you react an ester with a strong base (like \\(NaOH\\)), it breaks down into an alcohol and a carboxylate salt. \n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    This process is called <strong>Saponification</strong> because it is the exact reaction used to make soap from fats (which are natural esters).\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 4",
     topic: ["Acidity and Basicity"],
     Question: {
      content:
       "Identify the compound with the highest \\(pK_a\\) value among: 2-chloroethanoic acid, butanoic acid, and propanamine.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Propanamine"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Understanding pKa</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>High pKa = Weak Acid (or a Base)</strong><br>\n    The higher the \\(pK_a\\), the less acidic the substance is.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>The Candidates</strong><br>\n    * <strong>2-chloroethanoic acid:</strong> Strong acid (low \\(pK_a\\)) because of Chlorine.<br>\n    * <strong>Butanoic acid:</strong> Weak acid (medium \\(pK_a\\)).<br>\n    * <strong>Propanamine:</strong> This is a <strong>base</strong>. Bases have very high \\(pK_a\\) values (usually > 30 for the neutral molecule).\n  </div>\n\n  <div style='background: var(--cAnsBg); color: var(--cAns); padding: 12px; border-radius: 6px; border-left: 4px solid var(--cAns); margin-top: 15px;'>\n    <strong>✓ Final Answer:</strong> Propanamine is the least acidic, so it has the highest \\(pK_a\\).\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 5",
     topic: ["Organometallic Compounds"],
     Question: {
      content:
       "What is the general name for an organometallic compound that contains magnesium?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Grignard Reagent"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>The Grignard Reagent</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    Compounds with the general formula \\(R-Mg-X\\) (where R is a carbon group and X is a halogen) are called <strong>Grignard reagents</strong>.\n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    They are famous in organic chemistry for building carbon-carbon bonds. They were named after Victor Grignard, who won a Nobel Prize for discovering them!\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 6",
     topic: ["Alkyl Halides", "Physical Properties"],
     Question: {
      content:
       "Arrange the following halides in order of increasing boiling points: \\(CH_3F\\), \\(CHCl_3\\), \\(CH_3Br\\), and \\(CH_3I\\).",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\(CH_3F < CH_3Br < CH_3I < CHCl_3\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Boiling Point Factors</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>1. Molecular Mass:</strong> Heavier molecules usually have higher boiling points because they have stronger Van der Waals forces.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>Comparison:</strong><br>\n    \\(CH_3F\\) is the lightest (lowest BP).<br>\n    \\(CH_3Br\\) and \\(CH_3I\\) follow as the halogen gets heavier.<br>\n    \\(CHCl_3\\) (Chloroform) has three Chlorine atoms, making it much heavier and more polar than the single-halogen methyl groups.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 7",
     topic: ["Amines", "Isomerism"],
     Question: {
      content:
       "Draw the structure and provide the name of a secondary amine with the molecular formula \\(C_2H_7N\\).",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Dimethylamine (\\(CH_3-NH-CH_3\\))"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Defining a Secondary Amine</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    A <strong>secondary amine</strong> is one where the Nitrogen is attached to <strong>two</strong> carbon atoms.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    With only 2 carbons available (\\(C_2\\)), the only way to make it secondary is to put the Nitrogen in the middle: <br>\n    \\(CH_3 - NH - CH_3\\)\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 8",
     topic: ["Reaction Mechanisms", "Nucleophilic Substitution"],
     Question: {
      content:
       "How many reaction steps are involved in an \\(S_N1\\) reaction mechanism?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Two steps"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>The SN1 Mechanism</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    Despite the '1' in its name (which refers to the number of molecules in the slow step), an \\(S_N1\\) reaction happens in <strong>two distinct stages</strong>:\n  </div>\n\n  \n\n  <ol>\n    <li><strong>Step 1:</strong> The leaving group departs, forming a carbocation (slow step).</li>\n    <li><strong>Step 2:</strong> The nucleophile attacks the carbocation (fast step).</li>\n  </ol>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 9",
     topic: ["Nitriles", "Nomenclature"],
     Question: {
      content: "Draw the structure of 2-cyanopropane.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\((CH_3)_2CHCN\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Breaking down the Name</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    * <strong>Propane:</strong> Means a 3-carbon chain.\n    * <strong>2-cyano:</strong> Means a Nitrile group (\\(-C \\equiv N\\)) is attached to the second (middle) carbon.\n  </div>\n\n  <div style='background: rgba(0,0,0,0.05); padding: 10px; border-radius: 5px;'>\n    Structure:<br>\n    \\(CH_3 - CH(CN) - CH_3\\)\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 10",
     topic: ["Amines", "Nomenclature"],
     Question: {
      content: "Draw the chemical structure of N,N-dimethyl-2-propylamine.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\((CH_3)_2CH-N(CH_3)_2\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Visualizing the Molecule</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    * <strong>2-propylamine:</strong> A 3-carbon chain where the Nitrogen is on the middle carbon.\n    * <strong>N,N-dimethyl:</strong> This tells us there are two methyl (\\(CH_3\\)) groups attached directly to that Nitrogen atom.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    This is a <strong>tertiary amine</strong> because the Nitrogen is bonded to three different carbon atoms.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 11",
     topic: ["Amines", "Nomenclature"],
     Question: {
      content: "Draw the chemical structure of N-ethyl propenamine.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\(CH_2=CH-CH_2-NH-CH_2-CH_3\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Building N-ethyl propenamine</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>Step 1: The Parent Chain</strong><br>\n    'Propenamine' tells us there is a 3-carbon chain with a double bond (propene) attached to a Nitrogen atom.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>Step 2: The Substitution</strong><br>\n    'N-ethyl' means an ethyl group (\\(CH_2CH_3\\)) is attached directly to the Nitrogen atom (N) instead of a hydrogen.\n  </div>\n\n  <div style='background: var(--cAnsBg); color: var(--cAns); padding: 12px; border-radius: 6px; border-left: 4px solid var(--cAns); margin-top: 15px;'>\n    <strong>✓ Structure:</strong> The Nitrogen acts as a bridge between the propenyl group and the ethyl group.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 12",
     topic: ["Esterification", "Carboxylic Acids"],
     Question: {
      content:
       "Draw the structure of the major compound formed when ethanol is reacted with methanoic acid in the presence of dilute \\(H_2SO_4\\).",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Ethyl methanoate (\\(HCOOCH_2CH_3\\))"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Esterification Reaction</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    When an alcohol (Ethanol) reacts with a carboxylic acid (Methanoic acid) using an acid catalyst (\\(H_2SO_4\\)), they join together to form an <strong>Ester</strong> and water.\n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>The Assembly:</strong><br>\n    Take the 'Methanoate' part from the acid and the 'Ethyl' part from the alcohol. Link them at the oxygen atom.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 13",
     topic: ["Conformational Analysis", "Cycloalkanes"],
     Question: {
      content:
       "Draw the structure of the most stable conformer of methyl cyclohexane.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content:
       "Chair conformation with the methyl group in the equatorial position"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Stability in Cyclohexane</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    Cyclohexane isn't flat; it looks like a 'chair'. There are two places to put groups: sticking straight up/down (axial) or sticking out to the side (equatorial).\n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>Why Equatorial?</strong><br>\n    When a group is in the <strong>equatorial</strong> position, it has more room. In the axial position, it bumps into other hydrogen atoms (called 1,3-diaxial strain). Therefore, equatorial is more stable.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 14",
     topic: ["Sulfur Compounds", "Nomenclature"],
     Question: {
      content: "Provide the structure of ethyl methyl sulphide.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\(CH_3-S-CH_2CH_3\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Understanding Sulphides (Thioethers)</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    A 'sulphide' in organic chemistry is like an ether, but with a <strong>Sulfur (S)</strong> atom instead of an Oxygen atom in the middle.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    This name tells you exactly what is attached to the Sulfur:<br>\n    * One side: <strong>Methyl</strong> (\\(CH_3\\))<br>\n    * Other side: <strong>Ethyl</strong> (\\(CH_2CH_3\\))\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 15",
     topic: ["Elimination Reactions", "Alcohols"],
     Question: {
      content:
       "State what is formed during the elimination reaction of alcohols.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Alkenes"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Dehydration of Alcohols</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    An <strong>elimination reaction</strong> is like a 'subtraction' problem. From an alcohol, we remove a molecule of water (\\(H_2O\\)).\n  </div>\n\n  <img src='./m/images.png' class='explainImg' alt='' /> < div style = 'margin-bottom: 12px;' >  When the\\(-OH\\) and a nearby\\(-H\\) are removed,      the carbon atoms must form a < strong > double bond < /strong> to stay stable, turning the molecule into an <strong>alkene</strong > .  < /div> </div > "
     }
    },
    {
     type: "Question",
     name: "Question 16",
     topic: ["Stereochemistry", "Chirality"],
     Question: {
      content:
       "Draw the structure of 3-methylbutan-2-ol and indicate the stereogenic center(s) with asterisks.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\(CH_3-CH(CH_3)-C^*H(OH)-CH_3\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Identifying Chiral Centers</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    A <strong>stereogenic center</strong> (or chiral center) is a carbon atom attached to <strong>four different things</strong>.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    In 3-methylbutan-2-ol, look at Carbon-2. It is attached to:<br>\n    1. A hydrogen (\\(H\\))<br>\n    2. A hydroxyl group (\\(OH\\))<br>\n    3. A methyl group (\\(CH_3\\))<br>\n    4. An isopropyl group (\\(CH(CH_3)_2\\))\n  </div>\n\n  <div style='background: var(--cAnsBg); color: var(--cAns); padding: 12px; border-radius: 6px; border-left: 4px solid var(--cAns); margin-top: 15px;'>\n    Since all four are different, Carbon-2 is the stereogenic center (*).\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 17",
     topic: ["Stereochemistry", "Geometric Isomerism"],
     Question: {
      content: "Draw the structure of Z-1-bromo-1-fluoro-2-methylbut-1-ene.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content:
       "Structure with Br and the Ethyl group on the same side of the double bond."
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>The Z/E System (Zusammen)</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    'Z' stands for the German word <em>zusammen</em>, which means <strong>together</strong>. In chemistry, it means the highest priority groups on each side of the double bond are on the same side.\n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>Priority Check:</strong><br>\n    * Carbon 1: Bromine (Atomic #35) > Fluorine (Atomic #9)<br>\n    * Carbon 2: Ethyl group > Methyl group\n  </div>\n\n  <div style='background: var(--infoBg); color: var(--infoCl); padding: 10px; border-radius: 5px;'>\n    To be 'Z', the Bromine and the Ethyl group must be on the same horizontal plane (both 'up' or both 'down').\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 18",
     topic: ["Acyl Halides", "Nomenclature"],
     Question: {
      content: "Give the structure of propanoyl bromide.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\(CH_3CH_2COBr\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Acyl Halides</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    This is an <strong>Acyl Bromide</strong>. It is derived from propanoic acid, but the \\(-OH\\) group is replaced by a <strong>Bromine (Br)</strong> atom.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    The structure features a 3-carbon chain with a double-bonded oxygen (carbonyl) on the end carbon, which is also bonded to the Bromine.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 19",
     topic: ["Isomerism", "Ethers and Alcohols"],
     Question: {
      content:
       "Is it True or False that ethyl methyl ether and ethanol are functional group isomers?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "False"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Checking the Math</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    To be isomers, two molecules <strong>must</strong> have the exact same number of atoms (molecular formula).\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    * <strong>Ethanol:</strong> 2 Carbons (\\(C_2H_6O\\))<br>\n    * <strong>Ethyl methyl ether:</strong> 3 Carbons (\\(C_3H_8O\\))\n  </div>\n\n  <div style='background: var(--icAns); color: white; padding: 12px; border-radius: 6px; margin-top: 15px;'>\n    <strong>Why False?</strong> They have different amounts of carbon. Dimethyl ether and Ethanol would be isomers, but not Ethyl methyl ether.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 20",
     topic: ["Nitriles", "Reduction Reactions"],
     Question: {
      content:
       "Give the structure of the compound formed when 2-methyl-1-cyanopropane is treated with \\(LiAlH_4\\) in the presence of hydrogen and nickel catalyst.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "3-methylbutan-1-amine (\\((CH_3)_2CHCH_2CH_2NH_2\\))"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Reduction of Nitriles</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    A 'cyano' group is a Carbon triple-bonded to a Nitrogen (\\(C \\equiv N\\)). When we treat it with strong reducing agents like \\(LiAlH_4\\), we add hydrogen to it.\n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    The \\(C \\equiv N\\) turns into a \\(CH_2-NH_2\\) group. This transforms the nitrile into a <strong>primary amine</strong>.\n  </div>\n\n  <div style='background: var(--cAnsBg); color: var(--cAns); padding: 12px; border-radius: 6px; border-left: 4px solid var(--cAns); margin-top: 15px;'>\n    <strong>Key Step:</strong> The carbon in the cyano group becomes the 1st carbon of the new amine chain.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 21",
     topic: ["Alkyl Halides", "Substitution Reactions"],
     Question: {
      content:
       "Give the structure of the major compound formed from the reaction of 1-butanol with \\(PCl_3\\).",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "1-chlorobutane (\\(CH_3CH_2CH_2CH_2Cl\\))"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Swapping OH for Cl</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    Phosphorus trichloride (\\(PCl_3\\)) is a reagent used to turn alcohols into alkyl chlorides. It acts like a chemical 'scissors' that cuts off the hydroxyl (\\(-OH\\)) group and replaces it with a Chlorine (\\(Cl\\)) atom.\n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>The Result:</strong><br>\n    Since we started with 1-butanol (a 4-carbon chain with the OH at the end), we end up with 1-chlorobutane.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 22",
     topic: ["Stereochemistry", "Optical Isomerism"],
     Question: {
      content:
       "How many optical isomers would be possible for a compound that has 3 different asymmetric carbon atoms?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "8"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>The Power of 2 Rule</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    To find the number of possible optical isomers (different 'mirror versions' of a molecule), we use the formula:<br>\n    <div style='text-align: center; font-weight: bold; padding: 10px;'>Total Isomers = \\(2^n\\)</div>\n    where <strong>n</strong> is the number of asymmetric (chiral) carbons.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>Calculation:</strong><br>\n    If \\(n = 3\\):<br>\n    \\(2^3 = 2 \\times 2 \\times 2 = 8\\)\n  </div>\n\n  <div style='background: var(--cAnsBg); color: var(--cAns); padding: 12px; border-radius: 6px; border-left: 4px solid var(--cAns); margin-top: 15px;'>\n    <strong>✓ Final Answer:</strong> There are 8 possible optical isomers.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 23",
     topic: ["Aldehydes", "Reduction Reactions"],
     Question: {
      content:
       "What is the product formed when Lithium aluminium hydride (\\(LiAlH_4\\)) reacts with butanal?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "1-butanol"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Reducing Aldehydes</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    Lithium aluminium hydride (\\(LiAlH_4\\)) is a very strong <strong>reducing agent</strong>. In organic chemistry, 'reduction' often means adding hydrogen atoms to a molecule.\n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    When butanal (an aldehyde) is reduced, the double bond between Carbon and Oxygen (\\(C=O\\)) is broken and converted into a single bond with an OH group (\\(C-OH\\)). This turns the aldehyde into a <strong>primary alcohol</strong>.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 24",
     topic: ["Carboxylic Acids", "Electronic Effects"],
     Question: {
      content:
       "Match the three \\(pK_a\\) values of 2.86, 4.05, and 4.82 with the following three acids: Butanoic acid, 2-chlorobutanoic acid, and 3-chlorobutanoic acid.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content:
       "2-chlorobutanoic acid (2.86), 3-chlorobutanoic acid (4.05), Butanoic acid (4.82)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Acidity and the Inductive Effect</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    <strong style='color: var(--strongColor);'>The Rule:</strong> A <strong>lower \\(pK_a\\)</strong> means a <strong>stronger acid</strong>.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    1. <strong>Chlorine is 'Electronegative':</strong> It pulls electrons away from the acidic end, making it easier for the acid to release its hydrogen.<br>\n    2. <strong>Distance Matters:</strong> The closer the Chlorine is to the acid group, the stronger the pull.\n  </div>\n\n  <ul style='margin-bottom: 12px;'>\n    <li><strong>2-chlorobutanoic acid:</strong> Cl is very close. Strongest acid → lowest \\(pK_a\\) (2.86).</li>\n    <li><strong>3-chlorobutanoic acid:</strong> Cl is further away. Middle strength → middle \\(pK_a\\) (4.05).</li>\n    <li><strong>Butanoic acid:</strong> No Chlorine to help. Weakest acid → highest \\(pK_a\\) (4.82).</li>\n  </ul>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 25",
     topic: ["Stereochemistry", "Meso Compounds"],
     Question: {
      content:
       "True or False: 2,3-dichlorobutane is chiral and optically active.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "False"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>The 'Meso' Trap</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    While 2,3-dichlorobutane has two chiral centers, it has a version called a <strong>Meso compound</strong>. \n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    A Meso compound has an internal mirror plane that splits the molecule into two identical halves. Because of this symmetry, the two halves cancel each other out, making the molecule <strong>achiral</strong> (not chiral) and <strong>optically inactive</strong>.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 26",
     topic: ["Alcohols", "Oxidation Reactions"],
     Question: {
      content:
       "State what is formed during the oxidation of secondary alcohols.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Ketones"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Oxidation of Alcohols</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    In organic chemistry, <strong>oxidation</strong> usually means removing Hydrogen atoms.\n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    When you oxidize a <strong>secondary alcohol</strong> (where the OH is on a carbon connected to two other carbons), you remove two hydrogens and form a double bond between Carbon and Oxygen. This specific structure is called a <strong>Ketone</strong>.\n  </div>\n\n  <div style='background: var(--infoBg); color: var(--infoCl); padding: 10px; border-radius: 5px;'>\n    Secondary Alcohol \\(\\rightarrow\\) Ketone\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 27",
     topic: ["Isomerism", "Aldehydes and Ketones"],
     Question: {
      content:
       "Provide the structure of a functional group isomer of 2-pentanone.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Pentanal (\\(CH_3CH_2CH_2CH_2CHO\\))"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Switching Functional Groups</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    Functional group isomers are molecules with the same chemical formula but different 'families' of chemistry.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    <strong>Ketones</strong> (like 2-pentanone) are almost always isomers of <strong>Aldehydes</strong>. Since 2-pentanone has 5 carbons, its aldehyde brother is <strong>Pentanal</strong> (a 5-carbon chain with the double-bonded oxygen at the very end).\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 28",
     topic: ["Ketones", "Reduction Reactions"],
     Question: {
      content:
       "What is the name of the compound formed upon Clemmensen reduction of 2-pentanone?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Pentane"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>The Clemmensen Reduction</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    The <strong>Clemmensen reduction</strong> (using Zinc amalgam and HCl) is a reaction that completely deletes the oxygen from a \\(C=O\\) group and replaces it with two hydrogens.\n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    It basically turns a ketone or aldehyde into a plain hydrocarbon (an alkane).\n  </div>\n\n  <div style='background: var(--cAnsBg); color: var(--cAns); padding: 12px; border-radius: 6px; border-left: 4px solid var(--cAns); margin-top: 15px;'>\n    2-pentanone (ketone) \\(\\rightarrow\\) Pentane (alkane)\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 29",
     topic: ["Stereochemistry", "Fischer Projection"],
     Question: {
      content:
       "Draw the structure of (R)-2-Bromopropanoic acid using Fischer projection.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content:
       "Structure with COOH at top, CH3 at bottom, H on left, and Br on right."
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Fischer Projections and R/S</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    In a <strong>Fischer projection</strong>, we draw a cross. The vertical line goes away from you, and the horizontal line comes toward you.\n  </div>\n\n  \n\n  <ol>\n    <li><strong>Top:</strong> Place the most oxidized carbon (COOH).</li>\n    <li><strong>Bottom:</strong> Place the methyl group (CH3).</li>\n    <li><strong>Sides:</strong> To get the <strong>(R) configuration</strong>, we arrange the Bromine and Hydrogen so that the priority sequence (Br > COOH > CH3) goes clockwise.</li>\n  </ol>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 30",
     topic: ["Alcohols", "Stereochemistry"],
     Question: {
      content:
       "Draw the chemical structure of 2-chloropropan-1-ol and indicate the stereogenic center(s) with an asterisk.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\(CH_3-C^*HCl-CH_2OH\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Identifying the Chiral Center</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    A <strong>stereogenic center</strong> is bonded to <strong>four completely different groups</strong>.\n  </div>\n\n  <div style='margin-bottom: 12px;'>\n    Analyzing C2: It is bonded to Methyl (\\(CH_3\\)), Hydrogen (\\(H\\)), Chlorine (\\(Cl\\)), and Hydroxymethyl (\\(CH_2OH\\)). All are different!\n  </div>\n\n  \n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 31",
     topic: ["Esterification", "Nomenclature"],
     Question: {
      content:
       "Draw the structure of the product formed from the reaction of 1-propanol with ethanoic acid in the presence of an acid catalyst.",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Propyl ethanoate (\\(CH_3COOCH_2CH_2CH_3\\))"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>The Ester 'Lego' Reaction</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    This is an <strong>Esterification</strong>. It's like taking two pieces of a puzzle and snapping them together while a small piece (water) falls off.\n  </div>\n\n  \n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 32",
     topic: ["Physical Properties", "Intermolecular Forces"],
     Question: {
      content:
       "Arrange the following compounds in an increasing order of their boiling points: \\(CH_3CH_2OH\\), \\(CH_3CH_2CH_3\\), and \\(CH_3OCH_3\\).",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "\\(CH_3CH_2CH_3 < CH_3OCH_3 < CH_3CH_2OH\\)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>The 'Stickiness' of Molecules</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    Boiling point depends on intermolecular forces. <strong>Ethanol</strong> has hydrogen bonding (strongest), <strong>Dimethyl ether</strong> is polar (middle), and <strong>Propane</strong> is non-polar (weakest).\n  </div>\n\n  [Image showing hydrogen bonding in ethanol vs dipole forces in ether]\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 33",
     topic: ["Phenols", "Electronic Effects"],
     Question: {
      content:
       "Between Phenol and p-Nitrophenol, which is more acidic and why?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content:
       "p-Nitrophenol is more acidic because the nitro group (\\(-NO_2\\)) is an electron-withdrawing group."
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Substituent Effects on Acidity</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    Acidity is determined by how stable the <strong>phenoxide ion</strong> (the molecule left behind after losing \\(H^+\\)) is. \n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    The <strong>Nitro group (\\(-NO_2\\))</strong> is strongly electron-withdrawing through both inductive and resonance effects. It pulls negative charge away from the oxygen, spreading it out and making the ion more stable. A more stable ion means a stronger acid.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 34",
     topic: ["Grignard Reagents", "Alcohols"],
     Question: {
      content:
       "What is the product of the reaction between Methylmagnesium bromide (\\(CH_3MgBr\\)) and Methanal (Formaldehyde), followed by acid hydrolysis?",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Ethanol (\\(CH_3CH_2OH\\))"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>\n  <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Carbon-Carbon Bond Formation</h4>\n  \n  <div style='margin-bottom: 12px;'>\n    Grignard reagents are powerful tools for building carbon chains. \n  </div>\n\n  \n\n  <div style='margin-bottom: 12px;'>\n    The methyl group (\\(CH_3^-\\)) from the Grignard attacks the carbon of methanal (\\(HCHO\\)). This creates a 2-carbon chain. After adding water/acid (hydrolysis), the oxygen turns into an alcohol group, resulting in <strong>Ethanol</strong>.\n  </div>\n</div>"
     }
    },
    {
     type: "Question",
     name: "Question 35",
     topic: ["Aromatic Compounds", "Electrophilic Substitution"],
     Question: {
      content:
       "Name the major product formed when Benzene reacts with \\(CH_3Cl\\) in the presence of anhydrous \\(AlCl_3\\).",
      type: "subjective"
     },
     Answer: {
      type: "string",
      content: "Methylbenzene (Toluene)"
     },
     Explanation: {
      type: "string",
      content:
       "<div style='color: var(--explainColor); background: var(--explainBg); padding: 15px; border-radius: 8px; border-left: 4px solid var(--strongColor);'>   <h4 style='color: var(--strongColor); margin-top: 0; margin-bottom: 15px;'>Friedel-Crafts Alkylation</h4>      <div style='margin-bottom: 12px;'>     This is a classic <strong>Friedel-Crafts Alkylation</strong> reaction. Benzene is normally very stable, but the \\(AlCl_3\\) catalyst helps create a 'hungry' carbon atom (carbocation) from the methyl chloride.   </div><img src='./m/Friedel-Crafts-Acylation.png' class='explainImg' alt='' />   <div style = 'margin-bottom: 12px;' >   The methyl group replaces one of the hydrogens on the benzene ring,      resulting in <strong>Methylbenzene</strong>,  commonly known as <strong > Toluene </strong>.   </div >   </div>"
     }
    }
   ]
  };*/
  let user = req.user;
  const old_balance = user.wallet.fake_balance + user.wallet.balance;

  //  console.log(examPaper);

  //deduct and record
  const newFakeBalance = user.wallet.fake_balance - 5;
  const newBalance = user.wallet.balance - 2;
  let newPrice = 2;

  let balance;
  let mode;

  if (newFakeBalance > 0) {
   //If we have free coins
   mode = "Free";
   balance = newFakeBalance;
   user.wallet.fake_balance = balance;
   newPrice = 5;
  } else if (newBalance > 0) {
   //If we have real coins
   mode = "Real";
   balance = newBalance;
   user.wallet.balance = newBalance;
   
  } else {
   //No free or real Coins
   throw new Error(
    `Insufficient PPQ Coins. To purchase more, Please go to your dashboard. And press the Buy(+) Button.`
   );
  }

  //save to user
  const payLoad = {
   sessionid: user.sensetive.sessionid.value,
   date: Date.now,
   balance: user.wallet.balance + user.wallet.fake_balance,
   item: `${course} ${session} _${mode}`
  };
  user.studentInfo.views.unshift(payLoad);
  user = await usersFunctions.saveUser(user);

  //save globally

  const transaction = {
   userTransaction: {
    type: "PQ View",
    cost: 2,
    description: `${course} ${session}_${mode} __${balance}`,
    status: "success",
    date: {
     start: Date.now,
     verified: null
    },
    new_balance: user.wallet.balance + user.wallet.fake_balance,
    old_balance: old_balance
   },
   gmail: user.gmail,
   transactionid: gen.randomDigits(10),
   sessionid: user.sensetive.sessionid.value
  };

  await saveFunctions.transactions(transaction);

  //Send exam paper to user.
  res.json({
   success: true,
   data: examPaper.data,
   user: {
    accessToken: user.sensetive.accessToken.value,
    balance: user.wallet.balance + user.wallet.fake_balance,
    wallet: user.wallet.address
   }
  });

  console.log("examPaper sent");
  console.log(transaction);
 } catch (err) {
  //failed to update the Available Courses . user will jut see the old ones.
  console.log("Courses update failed!");
  console.log(err);
  res.status(500).json({
   success: false,
   message: err.message
  });
 }
}
