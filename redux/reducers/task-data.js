export const taskDataVersion = 1.3;
export const taskData = [
  {
    title: "Brush your teeth",
    id: "1",
    type: "Morning",
    description:
      "When was the last time you brushed your teeth while paying attention to the act of brushing your teeth?",
    focusType: "Sight",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you see?"
  },
  {
    title: "Walk to the car",
    id: "2",
    type: "Evening",
    description:
      "Slow down and be in the moment. Too often we rush to where we need to be, focusing on the destination rather than the journey.",
    focusType: "Sound",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you hear?"
  },
  {
    title: "Walk mindfully",
    id: "3",
    type: "Day",
    description:
      "When we ground ourselves in our step, we can become part of the earth.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Feel the earth beneath your feet. Pay attention to the tiny movements your muscles make to keep your balanced. The slower you go, the stronger you feel these sensations."
  },
  {
    title: "Deep breathing",
    id: "4",
    type: "Anytime",
    description:
      "Our breath is always with us, it is a constant in our mindfulness practice.",
    focusType: "Smell",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you smell?",
    hints: "Slowly breathe in through your nostrils."
  },
  {
    title: "Stressed out",
    id: "5",
    type: "Anytime",
    description:
      "Take 5 long breaths and repeat this mantra: 'Breathing in, I calm my body. Berathing out, I smile.'",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints: ""
  },
  {
    title: "Eating mindfully",
    id: "6",
    type: "Anytime",
    description:
      "Our breath is always with us, it is a constant in our mindfulness practice.",
    focusType: "Taste",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you taste?",
    hints:
      "Place a piece of food on your tongue. Don't chew it, just let it be. Move it around inside your mouth. Notice the saliva glands starting to work. Take a bite into the food slowly and pay attention to your taste buds. Chew slowly and swallow after chewing thoroughly. Pay attention to the taste lingering in your mouth, and let it go away before you eat another piece.",
    premium: true
  },
  {
    title: "Returning home",
    id: "7",
    type: "Anytime",
    description: "",
    focusType: "Taste",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you taste?",
    hints: "",
    premium: true
  },
  {
    title: "Grateful for",
    id: "8",
    type: "Anytime",
    description:
      "It can be so helpful to our attitude and outlook if we take a step back and recognize the good things we have. Think about 3 things that you're grateful for today.",
    focusType: "Mind",
    applicableFocusTypes: ["Mind"],
    prompt: "What are you 3 things you're grateful for?",
    mindPrompt: "What are you 3 things you're grateful for?",
    hints:
      "These can be big things or little things. For example: Did someone say 'hi' to you today? Did you have water to take a shower? Do you have food to eat when you're hungry? Did you have a nice time spending a moment with a spouse, friend or family member?",
    premium: false
  }
];
