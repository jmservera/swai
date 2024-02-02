type CreateCompletionRequest = {
  suffix?: string | null;
  max_tokens?: number; // default 16
  temperature?: number; // max 2, min 0, default 0.8
  top_p?: number; // max 1, min 0, default 0.95
  mirostat_mode?: number; // max 2, min 0, default 0
  mirostat_tau?: number; // max 10, min 0, default 5
  mirostat_eta?: number; // max 1, min 0.001, default 0.1
  echo?: boolean;
  stream?: boolean;
  logprobs?: number;
  presence_penalty?: number; // max 2, min -2, default 0
  frequency_penalty?: number; // max 2, min -2, default 0
  n?: number; // default 1
  best_of?: number;
  top_k?: number; // min 0, max 40, default 40
  repeat_penalty?: number; // min 0, default 1.1
};

const defaultCreateCompletionRequest: CreateCompletionRequest = {
  max_tokens: 2048,
  temperature: 0.8,
  top_p: 0.95,
  mirostat_mode: 0,
  mirostat_tau: 5,
  mirostat_eta: 0.1,
  echo: false,
  stream: true,
  presence_penalty: 0,
  frequency_penalty: 0,
  n: 1,
  best_of: 1,
  top_k: 40,
  repeat_penalty: 1.1,
};
const CreateCompletionRequestDef = [
  {
    key: "max_tokens",
    type: "number",
    min: 1,
    max: 2048,
    default: defaultCreateCompletionRequest.max_tokens,
    increment: 1,
    desc: "The maximum number of tokens to generate.",
  },
  {
    key: "temperature",
    type: "number",
    min: 0,
    max: 2,
    default: defaultCreateCompletionRequest.temperature,
    increment: 0.1,
    desc: "Adjust the randomness of the generated text. Temperature is a hyperparameter that controls the randomness of the generated text. It affects the probability distribution of the model's output tokens. A higher temperature (e.g., 1.5) makes the output more random and creative, while a lower temperature (e.g., 0.5) makes the output more focused, deterministic, and conservative. The default value is 0.8, which provides a balance between randomness and determinism. At the extreme, a temperature of 0 will always pick the most likely next token, leading to identical outputs in each run.",
  },
  {
    key: "top_p",
    type: "number",
    min: 0,
    max: 1,
    default: defaultCreateCompletionRequest.top_p,
    increment: 0.05,
    desc: "Limit the next token selection to a subset of tokens with a cumulative probability above a threshold P.\nTop-p sampling, also known as nucleus sampling, is another text generation method that selects the next token from a subset of tokens that together have a cumulative probability of at least p. This method provides a balance between diversity and quality by considering both the probabilities of tokens and the number of tokens to sample from. A higher value for top_p (e.g., 0.95) will lead to more diverse text, while a lower value (e.g., 0.5) will generate more focused and conservative text.",
  },
  {
    key: "mirostat_mode",
    type: "number",
    min: 0,
    max: 2,
    default: defaultCreateCompletionRequest.mirostat_mode,
    increment: 1,
    desc: "Enable Mirostat constant-perplexity algorithm of the specified version (1 or 2; 0 = disabled)",
  },
  {
    key: "mirostat_tau",
    type: "number",
    min: 0,
    max: 10,
    default: defaultCreateCompletionRequest.mirostat_tau,
    increment: 0.1,
    desc: "Mirostat target entropy, i.e. the target perplexity - lower values produce focused and coherent text, larger values produce more diverse and less coherent text",
  },
  {
    key: "mirostat_eta",
    type: "number",
    min: 0.001,
    max: 1,
    default: defaultCreateCompletionRequest.mirostat_eta,
    increment: 0.001,
    desc: "Mirostat learning rate",
  },
  {
    key: "echo",
    type: "boolean",
    default: defaultCreateCompletionRequest.echo,
    desc: "Whether to echo the prompt in the generated text. Useful for chatbots.",
  },
  {
    key: "stream",
    type: "boolean",
    default: defaultCreateCompletionRequest.stream,
    desc: "Whether to stream the results as they are generated. Useful for chatbots.",
  },
  // {
  //   key: "logprobs",
  //   type: "number",
  //   min: 0,
  //   default: null,
  // },
  {
    key: "presence_penalty",
    type: "number",
    def: defaultCreateCompletionRequest.presence_penalty,
    desc: "Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
  },
  {
    key: "frequency_penalty",
    type: "number",
    def: defaultCreateCompletionRequest.frequency_penalty,
    desc: "Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
  },
  {
    key: "logit_bias",
    type: "object",
  },
  {
    key: "n",
    type: "number",
    def: defaultCreateCompletionRequest.n,
  },
  {
    key: "best_of",
    type: "integer",
    def: defaultCreateCompletionRequest.best_of,
  },
  {
    key: "top_k",
    type: "number",
    def: defaultCreateCompletionRequest.top_k,
    min: 0,
    max: 500,
    desc: "Limit the next token selection to the K most probable tokens. Top-k sampling is a text generation method that selects the next token only from the top k most likely tokens predicted by the model. It helps reduce the risk of generating low-probability or nonsensical tokens, but it may also limit the diversity of the output. A higher value for top_k (e.g., 100) will consider more tokens and lead to more diverse text, while a lower value (e.g., 10) will focus on the most probable tokens and generate more conservative text.",
  },
  {
    key: "repeat_penalty",
    type: "number",
    def: defaultCreateCompletionRequest.repeat_penalty,
    min: 0,
    max: 5,
    increment: 1.1,
  },
];

export { CreateCompletionRequestDef, defaultCreateCompletionRequest };
export type { CreateCompletionRequest };
