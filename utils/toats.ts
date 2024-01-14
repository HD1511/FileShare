import toast from "react-hot-toast";

const style = {
  borderRadius: '10px',
  background: '#333',
  color: '#fff',
}

export const ToastSuccess = (Message: string) => {
  return toast.success(Message, {
    duration: 1000,
    style: style,
  });
}

export const ToastFailed = (Message: string) => {
  return toast.error(Message, {
    duration: 1000,
    style: style,
  });
}

export const ToastEmoji = (Message: string, Emoji: any) => {
  return toast(Message, {
    duration: 1000,
    icon: Emoji,
    style: style,
  });
}