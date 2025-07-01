import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { push, set, ref, onValue } from "firebase/database";
import { app, auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ChatPage = () => {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchChats(user.uid);
      } else {
        setLoading(false);
        console.log("User not signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  // Scroll to bottom when new chat is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Fetch existing chats from DB
  const fetchChats = (uid) => {
    setLoading(true);
    const chatRef = ref(db, `chatHistory/${uid}`);
    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formatted = Object.values(data).map((entry) => ({
          prompt: entry.senderMsg,
          response: entry.responseMsg
        }));
        setChatHistory(formatted);
      } else {
        setChatHistory([]);
      }
      setLoading(false);
    });
  };

  // Submit new message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || !userId) return;

    const dummyResponse = "Hello, here is your AI result";

    saveData(prompt, dummyResponse);
    setPrompt("");
  };

  // Save message to Firebase
  const saveData = (userPrompt, dummyResponse) => {
    const chatRef = ref(db, `chatHistory/${userId}`);
    const newChatRef = push(chatRef);
    set(newChatRef, {
      userID: userId,
      senderMsg: userPrompt,
      responseMsg: dummyResponse,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col pt-16">
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="w-full h-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400 text-lg">Loading chats...</span>
            </div>
          ) : chatHistory.length === 0 ? (
            <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xl mb-2">Start a conversation</p>
              <p className="text-base text-gray-400">Type a message below to get started</p>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-end">
                    <div className="max-w-[70%]">
                      <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-6 py-3 shadow-sm text-base">
                        {chat.prompt}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[70%]">
                      <div className="bg-white border rounded-2xl rounded-bl-md px-6 py-3 shadow-sm text-base">
                        {chat.response}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      <div className="bg-gray-800 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-none px-6 py-4 flex-shrink-0">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              rows="1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              style={{
                minHeight: '52px',
                maxHeight: '120px',
                overflowY: 'auto'
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="bg-blue-500 hover:bg-blue-600  disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-3xl transition-colors flex items-center justify-center"
            style={{ width: '52px', height: '52px', flexShrink: 0 }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;