import BaseHeader from "@/organisms/BaseHeader";
import { LoginForm } from "@/organisms/LoginForm";

export default function LogIn () {
    
    
    return (<div
        className="flex-col justify-items-center"
    >
        <BaseHeader/>
        <LoginForm/>
    </div>);
}