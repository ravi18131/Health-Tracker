import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// uses a simple chain to process messages with langchain - rename the file LangchainProcessor.js to use this
// will only return an answer to the question and does not use oldMessages to generate a response

const LangchainProcessor = async (newMessage, oldMessages) => {
  const model = new OpenAI({
    temperature: 0,
    openAIApiKey: "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",
  });

  // The default prompt template is
  const template = `You are an healthcare chatbot so always answer like google chatbot.Don't answer in a "response: answer" format.
     Question: {question}`;

  try {
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["question"],
    });
    const chain = new LLMChain({ llm: model, prompt });
    const result = await chain.call({ question: newMessage });
    const text = result.text.trim();
    // return the response
    return text;
  } catch (error) {
    console.error("Error processing message with OpenAI:", error);
    return "Sorry, I faced an error processing your message.";
  }
};

export default LangchainProcessor;
