import React from "react";

const PasswordStrengthIndicator = ({
    validity: { minChar, number, specialChar }
}) => {
    return (
        <div className="password-meter text-left mb-4" >
            <p className="text-dark" style={{padding:0}}>Password must contain:</p>
            <p className="text-muted" style={{fontSize:14,padding:0}}>
                <PasswordStrengthIndicatorItem
                    isValid={minChar}
                    text="Have at least 8 characters"
                />
                <PasswordStrengthIndicatorItem
                    isValid={number}
                    text="Have at least 1 number"
                />
                <PasswordStrengthIndicatorItem
                    isValid={specialChar}
                    text="Have at least 1 special character"
                />
            </p>
        </div>
    );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
    const highlightClass = isValid
        ? "text-success"
        : isValid !== null
        ? "text-danger"
        : "";
    return <li className={highlightClass}>{text}</li>;
};

export default PasswordStrengthIndicator;