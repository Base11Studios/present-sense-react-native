export const taskDataVersion = 2.05;
export const taskData = [
  {
    title: "Brush your teeth",
    id: "1",
    type: "Morning",
    description:
      "When was the last time you brushed your teeth while paying attention to the act of brushing your teeth?",
    focusType: "Sight",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you see?",
    hints:
      "Brush slower than normal. Observe everything involved: the toothpaste, toothbrush against your gums and tongue, the movement of your arms, etc.",
    count: 0
  },
  {
    title: "Walk to the car",
    id: "2",
    type: "Morning",
    description:
      "Slow down and be in the moment. Too often we rush to where we need to be, focusing on the destination rather than the journey.",
    focusType: "Sound",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell"],
    prompt: "What did you hear?",
    hint:
      "Walk very slowly and observe the world around you. Were you focused on your destination like school or work? Bring your thoughts to your walking, or if you're already to your car, sit in your car for a few moments and breathe before starting the car.",
    count: 0
  },
  {
    title: "Walk mindfully",
    id: "3",
    type: "Day",
    description:
      "When we ground ourselves in our step, we can become part of the earth. Walk slowly and deliberately, paying attention to each step.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Feel the earth beneath your feet. Notice the tiny movements your muscles make to keep your balanced. The slower you go, the stronger you feel these sensations.",
    count: 0
  },
  {
    title: "Grateful for",
    id: "8",
    type: "Evening",
    description:
      "It can be so helpful to our attitude and outlook if we take a step back and recognize the good things we have. Think about 3 things that you're grateful for today.",
    focusType: "Mind",
    applicableFocusTypes: ["Mind"],
    prompt: "What are you 3 things you're grateful for?",
    mindPrompt: "What are you 3 things you're grateful for?",
    hints:
      "These can be big things or little things. For example: Did someone say 'hi' to you today? Did you have water to take a shower? Do you have food to eat when you're hungry? Did you have a nice time spending a moment with a spouse, friend or family member?",
    premium: false,
    count: 0
  },
  {
    title: "3 minute check-in",
    id: "9",
    type: "Anytime",
    description:
      "Take a chance to slow down and check in. Sit comfortably in a chair, close your eyes, and spend 3 minutes feeling into your body. Scan from your head to your toes and observe each part of the body. How does it feel? Is there pain or tension?",
    focusType: "Mind",
    applicableFocusTypes: ["Mind"],
    prompt: "What did you notice?",
    mindPrompt: "What did you notice?",
    hints:
      "You can do this anytime and it is especially helpful when you're feeling overwhelmed or stressed. If you have trouble focusing, fall back to observing your breath. Each time your focus wanders, gently bring your focus back and begin again.",
    premium: false,
    count: 0
  },
  {
    title: "5 minute breathing",
    id: "10",
    type: "Day",
    description:
      "Sit comfortably in a chair, close your eyes, and focus on your breath. Observe the parts of your body that move when you breath in, and those that move when you breath out. Focus on the nostrils, chest, or stomache.",
    focusType: "Sound",
    applicableFocusTypes: ["Sound", "Smell", "Sight"],
    prompt: "What did you hear?",
    mindPrompt: "",
    hints:
      "Slowly breathe in through your nostrils. Breath out using your stomache. Repeat for 5 minutes.",
    premium: false,
    count: 0
  },
  {
    title: "Mindfulness meditation",
    id: "11",
    type: "Anytime",
    description:
      "There are many mindfulness practices you can follow. Choose your favorite one, and start meditating. Use the prompt to bring a new observation to your practice.",
    focusType: "Sound",
    applicableFocusTypes: ["Sound", "Smell", "Sight"],
    prompt: "What did you hear?",
    hints:
      "Any mindfulness exercise will do. If you don't already know one, try this meditation for 10 minutes: Sit comfortably in a chair, close your eyes, and focus on your breath. Observe the parts of your body that move when you breath in, and those that move when you breath out. Focus on the nostrils, chest, or stomache.",
    premium: false,
    count: 0
  },
  {
    title: "Eating mindfully",
    id: "6",
    type: "Anytime",
    description: "",
    focusType: "Taste",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you taste?",
    hints:
      "Place a piece of food on your tongue. Don't chew it, just let it be. Move it around inside your mouth. Notice the saliva glands starting to work. Take a bite into the food slowly and pay attention to your taste buds. Chew slowly and swallow after chewing thoroughly. Pay attention to the taste lingering in your mouth, and let it go away before you eat another piece.",
    premium: false,
    count: 0
  },
  {
    title: "Showering",
    id: "12",
    type: "Anytime",
    description:
      "Many people use their daily shower time to think about the day ahead of them. Instead, it can be an incredible time to relax, feeling the water on your body, smelling the shampoo and soak, or listening to the water run.",
    focusType: "Taste",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell"],
    prompt: "What did you see?",
    hints:
      "You can do this at night too. Really soak in the sensations around you. Deep breathing can be really helpful. When your thoughts wander, take note and bring your attention back to the prompt.",
    premium: false,
    count: 0
  },
  // Premium
  {
    title: "Waking up",
    id: "13",
    type: "Morning",
    description:
      "Right when you wake up, before you do or think about anything else this morning, take some time to set the day on the right track. Feel into your body, be very aware of the thoughts in your head and watch them come and go.",
    focusType: "Touch",
    applicableFocusTypes: ["Touch"],
    prompt: "What did you feel?",
    hints:
      "Set a second alarm at night for 10-15 minutes after the first in case you doze back asleep while doing this meditation.",
    premium: true,
    count: 0
  },
  {
    title: "Deep breathing",
    id: "4",
    type: "Anytime",
    description:
      "Our breath is always with us, it is a constant in our mindfulness practice. Take several deep breaths, paying attention to the air coming in and going out.",
    focusType: "Smell",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you smell?",
    hints:
      "Slowly breathe in through your nostrils. Breath out using your stomache. Repeat at least 5 times.",
    premium: true,
    count: 0
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
    hints: "",
    premium: true,
    count: 0
  },
  {
    title: "Returning home",
    id: "7",
    type: "Evening",
    description:
      "Sometimes the drive home is stressful, sometimes we bring work or school home with us, sometimes we arrive home carrying an emotion from the day. Our spouse or roommates deserve you arriving in your best, so slow down, take a few deep breaths, and smile.",
    focusType: "Taste",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you taste?",
    hints:
      "Take deep breaths, walk mindfully, and walk to the door slowly. Get some awareness of what emotions you're carrying so you know how it may impact your interactions if someone is home.",
    premium: true,
    count: 0
  },
  {
    title: "Telephone meditation",
    id: "14",
    type: "Day",
    description:
      "When was the last time your phone went off and you didn't check it? It can actually be liberating to let it be! The next time your phone rings, buzzes, or sounds for a notification, don't answer it and don't check it. Just let it be.",
    focusType: "Mind",
    applicableFocusTypes: ["Mind"],
    prompt: "What did you notice?",
    mindPrompt: "What did you notice?",
    hints:
      "After your phone rings, spend some time checking in on your thoughts and feelings until the need to check it goes away. Over time you will become less dependent on it if you start to create space between you and it.",
    premium: true,
    count: 0
  },
  {
    title: "Mindful listening",
    id: "15",
    type: "Evening",
    description:
      "After a long day and finally having time to yourself, it can be really difficult to truely listen to someone else. You may be thinking about the stress of the day, or what will come tomorrow. After dinner is a great time to set your mind to actively listening to your spouse, family, roommate, etc.",
    focusType: "Sound",
    applicableFocusTypes: ["Sound"],
    prompt: "What did you hear?",
    hints:
      'Set aside 3-5 minutes where you will only listen to someone else. Don\'t think about how you will respond, just say things like "I understand", "OK", or just nod your head. Invest your energy in actively listening to what the other person is saying.',
    premium: false,
    count: 0
  },
  {
    title: "Daily intention",
    id: "16",
    type: "Morning",
    description:
      'Give your day a focus by setting an intention in the morning. This is something small you want to focus on or achieve, like "Be kind", "Help a stranger", "Smile often", "Be positive", "Leave work on time", "Eat 3 pieces of fruit", "Don\'t eat candy", etc.',
    focusType: "Mind",
    applicableFocusTypes: ["Mind"],
    prompt: "What is your intention for the day?",
    mindPrompt: "What is your intention for the day?",
    hints: "Make your intention something small you can achieve.",
    premium: true,
    count: 0
  }
];
