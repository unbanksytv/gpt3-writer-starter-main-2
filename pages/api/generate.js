import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
// I build Prompt #1.
const basePrompt =
The following is a conversation with an travel assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Where would you like to go?\nAI: I am an AI travel agent created by OpenAI. How can I help you today?\nHuman: I'd like to find a 5-star hotel, a couple of gastronomic restaurant to eat, some musea nearby, the nearby surf spots, and general recommendations about the destination.\nAI:

console.log(API: ${basePrompt}${req.body.userInput})

// I call the OpenAI API with Prompt #1.
const baseCompletion = await openai.createCompletion({
model: 'text-davinci-003',
prompt: ${basePrompt}${req.body.userInput},
temperature: 0.8,
max_tokens: 600,
});

const basePromptOutput = baseCompletion.data.choices.pop();

// I build Prompt #2 using the output from Prompt #1.
const secondPrompt =
`
What are the top 3 museums nearby, get 3 recommendations for fine dining, and recommend 3 places to sleep, with the preference for a 5-star hotel."

Destination: ${req.body.userInput}

Recommendation: ${basePromptOutput.text}

Results: answer in an editorial manner

Example: Biarritz, located on the southwestern coast of France in the Basque Country, is a renowned destination for both its beautiful beaches and its thriving culture and cuisine. Visitors to the area will find a range of fine dining options, from the Michelin-starred La Table de Lili to the elegant La Scène.

For those interested in the arts and history, Biarritz offers a number of museums to explore, including the Musée de la Mer, which focuses on the region's maritime heritage, and the Musée Asiatica, which houses a collection of Asian art and artifacts.

Surfers will find plenty of opportunities to ride the waves at popular spots such as Côte des Basques and Plage de la Milady, while those looking to relax in luxury can choose from a selection of 5-star hotels, including the iconic Hôtel du Palais and the spa-focused Les Bains de L'Océan.
`

// I call the OpenAI API a second time with Prompt #2.
const secondPromptCompletion = await openai.createCompletion({
model: 'text-davinci-003',
prompt: ${secondPrompt},
// I set a higher temperature for this one. Up to you!
temperature: 0.85,
// I also increase max_tokens.
max_tokens: 1250,
});
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
