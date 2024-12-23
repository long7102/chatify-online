import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-32 h-32 rounded-2xl flex items-center justify-center"
                        >
                            <img
                                className="w-full h-full object-cover"
                                src="/giphy.gif"
                                alt="Welcome Animation"
                            />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="flex gap-3 text-2xl font-bold items-center">Chào mừng đến với Chatify <MessageSquare/></h2>
                <p className="text-base-content/60">
                    Chọn một cuộc trò chuyện để bắt đầu
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;
