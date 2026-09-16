def route_task(user_input: str):
    user_input = user_input.lower()
    if "quiz" in user_input or "test" in user_input:
        return "quiz"
    elif "summarize" in user_input or "summary" in user_input:
        return "summarize"
    elif "viva" in user_input or "interview" in user_input:
        return "viva"
    elif "plan" in user_input or "schedule" in user_input:
        return "plan"
    else:
        return "qa"