"use client"
import React from 'react';
import { auth } from "@/auth";

const authWrapper = ({ children }:{ children: React.ReactNode }) => {
    return (
        <auth>
            {children}
        </auth>
    )
}

export default SessionWrapper;