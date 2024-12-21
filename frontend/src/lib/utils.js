export function formatMessageTime(date) {
    const messageDate = new Date(date);
    const now = new Date();
    const differenceInMs = now - messageDate;
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    if (differenceInMinutes < 1) {
        return "Vừa xong";
    } else if (differenceInMinutes < 60) {
        return `${differenceInMinutes} phút trước`;
    } else if (differenceInHours < 24) {
        return `${differenceInHours} giờ trước`;
    } else if (differenceInDays === 1) {
        return "Hôm qua";
    } else {
        return messageDate.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
}
