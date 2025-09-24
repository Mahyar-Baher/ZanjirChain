import useAuthStore from "../context/authStore";



const Test = () => {
    const { wallet, fetchWalletBalance } = useAuthStore();
    return "test"
}

export default Test;