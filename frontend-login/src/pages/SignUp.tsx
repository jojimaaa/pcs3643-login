import BaseHeader from "@/organisms/BaseHeader";
import { SignupForm } from "@/organisms/SignupForm";

export default function SignUp() {
        return (<div
        className="flex-col justify-items-center"
    >
        <BaseHeader/>
        <SignupForm/>
    </div>);
}