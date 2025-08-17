import os
from typing import TypedDict
import requests

from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI


# ---------- Setup ----------
# export GEMINI_API_KEY="your_api_key"
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0)


# ---------- Tools ----------
@tool
def get_weather(city: str) -> str:
    """Fetch weather for a city (dummy response or API)."""
    # Replace with OpenWeather API if you have a key
    return f"The weather in {city} is 29°C with clear skies."

@tool
def get_news(topic: str) -> str:
    """Fetch news for a topic (dummy)."""
    return f"Top headlines for {topic}: Headline1, Headline2."

@tool
def do_math(expr: str) -> str:
    """Evaluate a math expression safely."""
    try:
        result = eval(expr, {"__builtins__": {}})
        return f"Result: {result}"
    except Exception as e:
        return f"Error: {e}"


# ---------- State ----------
class AgentState(TypedDict):
    input: str
    decision: str
    output: str


# ---------- Supervisor ----------
def supervisor(state: AgentState):
    prompt = f"""
You are a supervisor. Decide the correct action for the user query.

Options:
- WEATHER:<city>
- NEWS:<topic>
- MATH:<expression>
- ANSWER:<text>

User query: {state['input']}
"""
    resp = llm.invoke(prompt)
    return {"decision": resp.content.strip()}


# ---------- Nodes ----------
def weather_node(state: AgentState):
    city = state["decision"].split(":", 1)[1].strip()
    return {"output": get_weather.invoke({"city": city})}

def news_node(state: AgentState):
    topic = state["decision"].split(":", 1)[1].strip()
    return {"output": get_news.invoke({"topic": topic})}

def math_node(state: AgentState):
    expr = state["decision"].split(":", 1)[1].strip()
    return {"output": do_math.invoke({"expression": expr})}

def answer_node(state: AgentState):
    return {"output": state["decision"].split(":", 1)[1].strip()}


# ---------- Graph ----------
graph = StateGraph(AgentState)

graph.add_node("supervisor", supervisor)
graph.add_node("weather", weather_node)
graph.add_node("news", news_node)
graph.add_node("math", math_node)
graph.add_node("answer", answer_node)

graph.set_entry_point("supervisor")

graph.add_conditional_edges(
    "supervisor",
    lambda s: (
        "weather" if s["decision"].startswith("WEATHER")
        else "news" if s["decision"].startswith("NEWS")
        else "math" if s["decision"].startswith("MATH")
        else "answer"
    ),
    {"weather": "weather", "news": "news", "math": "math", "answer": "answer"},
)

graph.add_edge("weather", END)
graph.add_edge("news", END)
graph.add_edge("math", END)
graph.add_edge("answer", END)

app = graph.compile()


# ---------- Run ----------
if __name__ == "__main__":
    queries = [
        "What's the weather in Delhi?",
        "Give me news about space",
        "Calculate 23*9",
        "Who is the prime minister of India?"
    ]
    for q in queries:
        res = app.invoke({"input": q})
        print(f"Q: {q}\nA: {res['output']}\n")
