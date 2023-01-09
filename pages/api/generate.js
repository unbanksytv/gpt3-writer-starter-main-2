import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
The following is a conversation with an travel assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Where would you like to go?\nAI: I am an AI travel agent created by OpenAI. How can I help you today?\nHuman: I'd like to find a 5-star hotel, a couple of gastronomic restaurant to eat, some musea nearby, the nearby surf spots, and general recommendations about the destination.\nAI:.

You: What have you been up to?
Friend: Watching old movies.
You: Did you watch anything interesting?
Friend:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 600,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `
  What are the nearby museums, get 3 recommendations for fine dining, and a place to sleep, with the preference for a 5-star hotel."

  Destination: ${req.body.userInput}

  Recommendation: ${basePromptOutput.text}

  Results: 
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
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
