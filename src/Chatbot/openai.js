import axios from 'axios'; // Correct default import

export async function sendMsgToOpenAi(message) {
    console.log("Axios:", axios); // Debugging line

    const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/text/chat",
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjAxNmZkMzMtZGUzMC00MzAxLWJiMzMtMjM2ODBiMTdlNjkyIiwidHlwZSI6ImFwaV90b2tlbiJ9.QKFWUZRgpEpmz3en33FatfrXPGd3xVapQ59QjqxCJcI",
        },
        data: {
            providers: "openai/gpt-4o",
            text: message,
            chatbot_global_action: "Proficient Coder",
            previous_history: [],
            temperature: 0.0,
            max_tokens: 500,
        },
    };

    try {
        const response = await axios(options);
        const result = response.data;
        const answer = result['openai/gpt-4o']['generated_text'];
        console.log(response.data);
        return answer;
    } catch (error) {
        console.error("Error:", error);
        return "Error";
    }
}
