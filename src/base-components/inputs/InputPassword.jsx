import React, { useState } from 'react'
import { Lucide } from "@/base-components";

export default function InputPassword({ value, onChange, className, placeholder }) {

    const [isVisible, setIsVisible] = useState(false)

    return (
        <div>
            <div style={{ position: 'relative' }}>

                <input
                    id="update-profile-form-4"
                    type={isVisible ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={className}

                />
                <div onClick={() => setIsVisible(!isVisible)}>
                    <Lucide icon={isVisible ? "Eye" : "EyeOff"} className="block mx-auto" style={{ position: 'absolute', right: '20px', top: "9px" }} />
                </div>
            </div>
        </div>
    )
}
