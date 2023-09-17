import logging

import tiktoken as tiktoken
from langchain import PromptTemplate
from langchain.chat_models import ChatOpenAI

logger = logging.getLogger()
MODEL_NAME = "gpt-3.5-turbo"


def get_chat_model():
    """
    Get chat model to be used for NER
    Returns:
        Instance of LLM Model
    """
    return ChatOpenAI(model_name=MODEL_NAME, temperature=0)


def trim_prompt_for_llm_input(prompt: str) -> str:
    """
    The LLM we're using as of today cannot take more than 4097 tokens, which is why we're forced to trim the message
    Args:
        prompt : prompt for LLM

    Returns:
        trimmed message
    """
    max_token_length = 4000
    encoding = tiktoken.encoding_for_model(MODEL_NAME)
    prompt_tokens = encoding.encode(prompt)
    if len(prompt_tokens) <= max_token_length:
        return prompt
    else:
        trimmed_prompt_tokens = prompt_tokens[:max_token_length - 10] # just an arbitrary number to add some buffer
        decoded_trimmed_prompt_tokens = encoding.decode(trimmed_prompt_tokens)
        return "".join(decoded_trimmed_prompt_tokens)


def analyse_resume(resume_transcript: str, analytics_query) -> bool:
    """
    Analyse if the resume matches the given analysis query
    Args:
        resume_transcript: Text dump of the resume
        analytics_query: query to analyse the resule

    Returns:
        True or False
    """
    # Parse intents into a string
    intent_recognition_prompt_template = """
    You are RE-CUTE-GPT, a bot designed to modernize hiring by analyzing candidates' resumes for insightful "
    information beyond basic keyword searches. Today is {date_str}.
    
    Resume: 
    {resume_transcript}
    
    Question : {question}
    
    You need to answer in one word True or False if the user's resume matches the above criteria
    """
    intent_recognition_prompt = PromptTemplate.from_template(intent_recognition_prompt_template).format(
        resume_transcript=resume_transcript, question=analytics_query.question
    )
    trimmed_prompt = trim_prompt_for_llm_input(intent_recognition_prompt)
    # Query the agent
    llm = get_chat_model()
    answer = llm.predict(trimmed_prompt)
    return answer.lower() == "true"
