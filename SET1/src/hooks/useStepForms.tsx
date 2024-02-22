
import { useState } from 'react'

export function useStepForms(steps: number) {
    const [currentStepIndex, setCurrentStepIndex] = useState(1)

    const nextStep = () => {
        if (currentStepIndex < steps ) {
            setCurrentStepIndex((i) => i + 1)
        }
    }

    const previousStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((i) => i - 1)
        }
    }

    const goTo = (index: number) => {
        setCurrentStepIndex(index)
    }

    return {
        currentStepIndex,
        steps,
        isFirstStep: currentStepIndex === 1,
        isLastStep: currentStepIndex === steps,
        goTo,
        nextStep,
        previousStep
    }
}