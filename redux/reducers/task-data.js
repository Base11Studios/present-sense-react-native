export const taskDataVersion = 2.62;
export const taskData = [
  {
    title: "Brush your teeth",
    id: "1",
    type: "Morning",
    description:
      "When was the last time you brushed your teeth while paying attention to the act of brushing your teeth? Let's try that now.",
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
      "Too often we rush to where we need to be, focusing on the destination rather than the journey. Next time you get ready to leave the house and walk to your car, slow down and be in the moment. Be conscious of your movement, one step at a time.",
    focusType: "Sound",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell"],
    prompt: "What did you hear?",
    hints:
      "Walk very slowly and observe the world around you. Are you focused on your destination like school or work? Bring your thoughts to your walking, or if you're already to your car, sit in your car for a few moments and breathe before starting the car.",
    count: 0
  },
  {
    title: "Walk mindfully",
    id: "3",
    type: "Day",
    description:
      "When we ground ourselves in our step, we can become part of the earth. Walk slowly and deliberately, paying attention to each step. Do this anytime you need a break, like at work or school, to reconnect with yourself and slow down.",
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
      "Take a chance to slow down and check in. Sit comfortably in a chair, close your eyes, and spend 3 minutes feeling into your body. Scan from your head to your toes and observe each part of the body. How does it feel?",
    focusType: "Mind",
    applicableFocusTypes: ["Mind"],
    prompt: "What did you notice?",
    mindPrompt: "What did you notice?",
    hints:
      "You can do this anytime and it is especially helpful when you're feeling overwhelmed or stressed. If you have trouble focusing, fall back to observing your breath. Do you feel any calm or relaxation in your muscles as you draw your focus?",
    premium: false,
    count: 0
  },
  {
    title: "5 minute breathing",
    id: "10",
    type: "Day",
    description:
      "Sit comfortably in a chair, close your eyes, and focus on your breath. Observe the parts of your body that move when you breathe in, and those that move when you breathe out. Focus on the nostrils, chest, or stomach.",
    focusType: "Sound",
    applicableFocusTypes: ["Sound", "Smell", "Sight"],
    prompt: "What did you hear?",
    mindPrompt: "",
    hints:
      "Slowly breathe in through your nostrils. Breathe out using your stomach. Repeat for 5 minutes.",
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
      "Any mindfulness exercise will do. If you don't already know one, try this meditation for 10 minutes: Sit comfortably in a chair, close your eyes, and focus on your breath. Observe the parts of your body that move when you breathe in, and those that move when you breathe out. Focus on the nostrils, chest, or stomach.",
    premium: false,
    count: 0
  },
  {
    title: "Eat mindfully",
    id: "6",
    type: "Anytime",
    description:
      "Food can be so enjoyable, but if you don't slow down and pay attention to it, you will miss everything it has to offer. This meal, commit to eating very slowly. Use all of your senses to experience your food.",
    focusType: "Taste",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you taste?",
    hints:
      "Place a piece of food on your tongue. Don't chew it, just let it be. Move it around inside your mouth. Notice the saliva glands starting to work. Take a bite into the food slowly and pay attention to your taste buds. Chew slowly and swallow after chewing thoroughly. Pay attention to the taste lingering in your mouth, and let it go away before you eat another piece.",
    premium: false,
    count: 0
  },
  {
    title: "Shower",
    id: "12",
    type: "Anytime",
    description:
      "Many people use their daily shower time to think about the day ahead of them. Instead, it can be an incredible time to relax, feeling the water on your body, smelling the shampoo and soap, or listening to the water run. Pay attention in the shower, and try to focus on your sense rather than letting your mind wander.",
    focusType: "Taste",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell"],
    prompt: "What did you see?",
    hints:
      "You can do this at night too. Really soak in the sensations around you. Deep breathing can be really helpful.",
    premium: false,
    count: 0
  },
  // Premium
  {
    title: "Wake up",
    id: "13",
    type: "Morning",
    description:
      "Right when you wake up, before you do or think about anything else this morning, take some time to set the day on the right track. Feel into your body, be very aware of the thoughts in your head and watch them come and go. Spend 2-3 minutes examining your body and being aware of your thoughts.",
    focusType: "Touch",
    applicableFocusTypes: ["Touch"],
    prompt: "What did you feel?",
    hints:
      "Set a second alarm at night for 10-15 minutes after the first in case you doze back asleep while doing this meditation.",
    premium: false,
    count: 0
  },
  {
    title: "6 breaths",
    id: "4",
    type: "Anytime",
    description:
      "Our breath is always with us, it is a constant in our mindfulness practice. Take 6 deep breaths - in through your nose, out through your mouth. Pay attention to the air as it comes in and out.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Slowly breathe in through your nostrils. Breathe out using your stomach. You may notice the breath in your nose, in your lungs, in your stomach, or somewhere else in your body. Focus on being aware of those sensations as you breathe.",
    premium: true,
    count: 0
  },
  {
    title: "Stressed out",
    id: "5",
    type: "Anytime",
    description:
      "Take 5 long breaths and repeat this mantra: 'Breathing in, I calm my body. Breathing out, I smile.'",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Try to keep your focus on your breath. If your mind wanders, take note and gently bring back your attention to your breath.",
    premium: true,
    count: 0
  },
  {
    title: "Return home",
    id: "7",
    type: "Evening",
    description:
      "Sometimes our day or our drive home is stressful or emotional and we arrive home carrying that emotion causing impact to those at home. They deserve more, so today when you return home slow down, take a few deep breaths, and smile.",
    focusType: "Taste",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you taste?",
    hints:
      "Take deep breaths, walk mindfully, and walk to the door slowly. Get some awareness of what emotions you're carrying so you know how it may impact your interactions if someone is home.",
    premium: false,
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
    title: "Listen mindfully",
    id: "15",
    type: "Evening",
    description:
      'Set aside 3-5 minutes where you will only listen to someone else. Don\'t think about how you will respond, just say things like "I understand", "OK", or just nod your head. Invest your energy in actively listening to what the other person is saying.',
    focusType: "Sound",
    applicableFocusTypes: ["Sound"],
    prompt: "What did you hear?",
    hints:
      "After a long day and finally having time to yourself, it can be really difficult to truly listen to someone else. You may be thinking about the stress of the day, or what will come tomorrow. After dinner is a great time to set your mind to actively listening to your spouse, family, roommate, etc.",
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
    hints:
      "Make your intention something small you can achieve. Try to bring awareness to your goal throughout the day to check in on how you're doing. It is OK to fail - recognize what went wrong and try again tomorrow!",
    premium: true,
    count: 0
  },
  {
    title: "Wash the dishes",
    id: "17",
    type: "Evening",
    description:
      "Chores aren't known to be fun, but they actually can be. In fact, they can be as exciting as anything else if you make the effort to do them mindfully. When you was the dishes, pay attention to the act of washing the dishes.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell"],
    prompt: "What did you feel?",
    hints:
      "Really be in the moment, present and aware, and when you notice your thoughts wandering wishing you were somewhere else, simply bring your focus back to the dishes. Feel the water or bubbles against your skin, notice your arms moving to scrub, breathe in the scent of the dish soap. ",
    premium: false,
    count: 0
  },
  {
    title: "Boredom",
    id: "18",
    type: "Day",
    description:
      "Find this mindful experience the next time you feel bored. Generally the reason we get bored is because we're wishing we were somewhere other than where we are right now. Take some time to focus on your body. Become aware of your thoughts. Observe them.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell"],
    prompt: "What did you feel?",
    hints:
      "Don't worry about what you're doing to do next, just focus on being present while doing what you're already doing. Once you realize you are happy where you are, the boredom will start to dissipate. It's OK if the boredom returns, just bring your focus back to the present moment.",
    premium: false,
    count: 0
  },
  {
    title: "Drink a glass of water",
    id: "19",
    type: "Morning",
    description:
      "This is a refreshing way to start your morning by waking up and cleasing your body for a new day. Fill a glass with fresh water then pick a space to be still while you drink.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Take your time drinking. Stay in your space so you can focus on the act of drinking your water. Try taking a sip with your eyes, then try it with your eyes open.",
    premium: true,
    count: 0
  },
  {
    title: "Morning tea or coffee",
    id: "20",
    type: "Morning",
    description:
      "Before taking your first sip, choose a space to sit down. Pay attention to the way your body feels with your first sip. Drink slowly like there's no where to be but where you already are.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Breathe in the aroma of your drink. Feel the cup on your hands. Watch the movement in the liquid as your drink.",
    premium: false,
    count: 0
  },
  {
    title: "Sit outside",
    id: "21",
    type: "Day",
    description:
      "The air outside is beautiful. Spend some time sitting outside, in a chair , on the ground, wherever is comfortable. Eyes open or closed. Be mindful of your breath and your senses.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Dress prepared for the weather, but if you feel slightly cold or warm, really soak in the feeling. We get uncomfortable because we resist the feeling, but when you accept that you're not the perfect temperature, it actually becomes bearable.",
    premium: true,
    count: 0
  },
  {
    title: "Drive to work",
    id: "22",
    type: "Morning",
    description:
      "Don't rush to your destination. Be thankful for each stoplight or train you encounter. When you stop, smile, take a deep breath, and be thankful for the opportunity to be mindful.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Try driving in silence. Think about how incredible it is that you can move so fast. Even though the car is moving, notice how your body is still.",
    premium: true,
    count: 0
  },
  {
    title: "Sit in a new place",
    id: "23",
    type: "Anytime",
    description:
      "Life becomes routine and sometimes we need a reminder to break out of it to experience each moment. Sit somewhere you don't normally sit - in your house, at work, wherever you are. Does your perspective change?",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "If you're at home or feel comfortable to do so, try closing your eyes. What new experiences can you find in this place?",
    premium: true,
    count: 0
  },
  {
    title: "Sit under the stars",
    id: "24",
    type: "Evening",
    description:
      "The Earth is just a speck in the universe's billions of billions of planets. The stars in the sky are light years away. We can see them but not travel to them. Sit and observe the awesomeness of outer space.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Examine the colors, the patterns the stars make, the movement in the sky. Feel your grounding on the Earth around you. What sounds come out at night?",
    premium: true,
    count: 0
  },
  {
    title: "Sit against a tree",
    id: "25",
    type: "Morning",
    description:
      "A great way to disconnect from your normal thoughts and experiences is in nature, and connecting to a tree can take you there. Sit and observe the world around you, taking note, and using your breath as needed to become aware.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Trees are grounded, they can weather the storm, they flex but not break, they are consistent and purposeful. We can learn a lot from trees and model our actions after them.",
    premium: true,
    count: 0
  },
  {
    title: "Walk in a park",
    id: "26",
    type: "Day",
    description:
      "Walk slowly, feel yourself grounded with the Earth on each step. Notice nature around you. What do you notice with your senses here, in this park? Breathe in the fresh air as you walk - how does it make you feel?",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Getting outside of our normal routine and into nature can be liberating. The Earth is beautiful, wonderful, inspirational - take a moment to appreciate it!",
    premium: true,
    count: 0
  },
  {
    title: "Wash your face",
    id: "27",
    type: "Evening",
    description:
      "An everyday task, washing your face can become thoughtless, but not anymore. Pay attention to the sensations you have when you apply the soap, lather it in, rinse it off. What differences are there now that your face is clean?",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Different soaps and wash clothes feel, smell, look different. Take note of each step of the process.",
    premium: true,
    count: 0
  },
  {
    title: "Cut vegetables",
    id: "28",
    type: "Evening",
    description:
      "When you're making dinner, focus on each task. How does the food smell as you cut it, what is the consistency, or how does it taste?",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Think about how this vegetable came to be here, now. It was a seed, planted, then grown with care. It was harvested, sold, and now you're lucky to enjoy it.",
    premium: true,
    count: 0
  },
  {
    title: "Stretch",
    id: "29",
    type: "Evening",
    description:
      "Stay flexible and fit by doing a quick 5 minute stretching routine each day. Use each stretch as an opportunity to be mindful. Each time your body is in a position it is not normally in is a chance to see a different perspective on life.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Try to bend over and touch your toes. Stretch your arms, legs, back, roll your neck, whatever stretches you know.",
    premium: true,
    count: 0
  },
  {
    title: "Drive with the windows down",
    id: "30",
    type: "Day",
    description:
      "Experience the outdoors while you go zoom! Soak in the fresh air and be a little closer to nature. Be mindful of your breathing and smile often.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Try turning off your radio and listening to the sound of the wind. Can you feel it make contact with your body? How does it feel with your arm out the window?",
    premium: true,
    count: 0
  },
  {
    title: "Listen to soothing music",
    id: "31",
    type: "Anytime",
    description:
      "Put on music that you find soothing, sit comfortably, and listen. Hear the notes. What do you picture? Take deep breaths to maintain focus. Feel your body sink into your seat and support your weight.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Try searching 'spa', 'study', 'calm' or 'classical' in your favorite music app. We love Spotify and Pandora's mixes.",
    premium: false,
    count: 0
  },
  // {
  //   title: "Observe people around you",
  //   id: "32",
  //   type: "Anytime",
  //   description: "",
  //   focusType: "Touch",
  //   applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
  //   prompt: "What did you feel?",
  //   hints: "",
  //   premium: true,
  //   count: 0
  // },
  {
    title: "Turn off your cell phone",
    id: "34",
    type: "Anytime",
    description:
      "70% of people say they wish they used their phones less. Well, do it! Turn it completely off. Do anything and be mindful during your experience. Look around and appreciate the world around you.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Try this throughout the day. When you get the urge to pick up your phone, recognize the urge, then smile to yourself and take a deep breath when you don't reach for it.",
    premium: true,
    count: 0
  },
  {
    title: "Wait in line",
    id: "35",
    type: "Day",
    description:
      "Take a break from always doing something and do nothing! Waiting is a chance to remove yourself from the daily hustle. Take deep breaths and just be happy in the now.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "Boredom comes from wanting to do something or be somewhere that you're not. Accept where you are to find peace.",
    premium: false,
    count: 0
  },
  {
    title: "Set alarm for checkin",
    id: "36",
    type: "Anytime",
    description:
      "Set an alarm or reminder for the future. When it goes off, take a couple minutes to stop what you're doing and check in. Take 3 deep breaths and do a quick head to toe body scan. How are you feeling?",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "If you find this helpful, make the reminder recurring so you can inject mindfulness into your daily life.",
    premium: true,
    count: 0
  },
  // {
  //   title: "Look into someone's eyes",
  //   id: "37",
  //   type: "Anytime",
  //   description: "",
  //   focusType: "Touch",
  //   applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
  //   prompt: "What did you feel?",
  //   hints: "",
  //   premium: true,
  //   count: 0
  // },
  {
    title: "Tutorial: 6 Breaths",
    id: "44",
    tutorialNumber: 0,
    type: "Tutorial",
    focusType: "Tutorial",
    applicableFocusTypes: ["Tutorial"],
    prompt: "What did you notice?",
    feelPrompt: "How do you feel?",
    helperText: [],
    activityText:
      "Let's practice mindfulness by taking 6 deep breaths through your nose. Focus on feeling the sensations in your nostrils as the air moves in and out.",
    observationText:
      "Great job! Now, let's write down what you observed during your 6 breaths. This helps you create a habit and visualize your experience.",
    feelingText:
      "Awesome! It is also important to be aware of your thoughts, feelings, and body. Close your eyes and briefly scan from head to toe.",
    conclusionText:
      "You just completed your first Mindful Experience! Do a few everyday to bring mindfulness into your life and experience every moment life can offer.",
    premium: false,
    count: 0
  },
  {
    title: "Tutorial: Wandering Mind",
    id: "38",
    tutorialNumber: 1,
    type: "Tutorial",
    focusType: "Tutorial",
    applicableFocusTypes: ["Tutorial"],
    prompt: "What did you notice?",
    feelPrompt: "How do you feel?",
    helperText: [
      "Mindfulness can be difficult, especially when we're already feeling emotions like anxiety, worry, and stress.",
      "It is completely normal for your thoughts to wander. In fact, the act of noticing and bringing your attention back to the present is what the practice is all about!",
      "Every time you practice, you're training your mind to recognize when you've lost focus of the present moment.",
      "Let's try a meditation completely focused on noticing when our mind wanders, and practicing gently guiding it back to the present!"
    ],
    activityText:
      "Set a timer for 5 minutes. Close your eyes, and become an observer of the thoughts in your head. Watch them come and go. When you get caught up in a thought, gently bring your focus back to observing.",
    observationText:
      "Great job! What did you notice as you were observing your thoughts?",
    feelingText:
      "Awesome! Now that you've completed the exercise, how do you feel?",
    conclusionText:
      "It can be overwhelming and challenging when you start out. Over time, you will get better at identifying the times your mind wanders and bringing back your focus to the present.",
    premium: false,
    count: 0
  },
  {
    title: "Tutorial: Focused Breathing",
    id: "39",
    tutorialNumber: 2,
    type: "Tutorial",
    focusType: "Tutorial",
    applicableFocusTypes: ["Tutorial"],
    prompt: "What did you notice?",
    feelPrompt: "How do you feel?",
    helperText: [
      "We can be mindful at any moment, anywhere, but sometimes it is difficult to find awareness of ourselves in everyday situations.",
      "We can use our breath, something that is always with us, as an anchor for our awareness. Whenever we want to be mindful, we simply focus on our breathing.",
      "By maintaining a focus on our breath in a formal practice, it will make it easier to be able to do when you're not practicing.",
      "Let's try a meditation completely focused on breathing with intention and observing each breath in our body."
    ],
    activityText:
      "Set a timer for 3 minutes. Take deep breaths in through your nose, then completely out through your mouth. Tie your breathing to your belly - move it in when you inhale, move it out when you exhale.",
    observationText:
      "Great job! What did you notice as you were observing your breath?",
    feelingText:
      "Awesome! Now that you've completed the exercise, how do you feel?",
    conclusionText:
      "Keep practicing breathing mindfully. When you feel stressed, anxious, happy, or just want to appreciate each moment, tune into your breath to bring your awareness to the now!",
    premium: false,
    count: 0
  },
  {
    title: "Tutorial: Body Scan",
    id: "40",
    tutorialNumber: 2,
    type: "Tutorial",
    focusType: "Tutorial",
    applicableFocusTypes: ["Tutorial"],
    prompt: "What did you notice?",
    feelPrompt: "How do you feel?",
    helperText: [
      "In order to be mindful of the world around us, it is important to be mindful of ourselves so we know how our state may impact what and how we observe.",
      "An easy to use technique to gain mindfulness of self is a body scan - a head to toe check-in on each part of the body.",
      "It goes like this: start with the top of your head - how does it feel? Now check in on your neck, then your shoulders, and repeat for each section of the body until you get to your toes.",
      "You may notice stress, tension, calm, relaxation, or something else. Whatever it is, it's OK. We're not trying to change how we feel, just be aware of it."
    ],
    activityText:
      "Take a few deep breaths. Close your eyes. Do a body scan from head to toes. Spend an inhale and an exhale checking in on each body part.",
    observationText:
      "Great job! What did you notice as you were doing the body scan?",
    feelingText:
      "Awesome! Now that you've completed the exercise, how do you feel?",
    conclusionText:
      "Body scans are a great way to be aware of how you're feeling in this moment. Use them both in formal meditation practice and in everyday moments to bring awareness to the present.",
    premium: false,
    count: 0
  },
  {
    title: "Tutorial: Noting",
    id: "41",
    tutorialNumber: 3,
    type: "Tutorial",
    focusType: "Tutorial",
    applicableFocusTypes: ["Tutorial"],
    prompt: "What did you notice?",
    feelPrompt: "How do you feel?",
    helperText: [
      "Noticing when your mind wanders can be tricky when you first start practicing mindfulness and there are techniques we can use to make it easier.",
      "One technique, 'mental noting', is the practice of using a simple note to calmly name what we're experiencing.",
      "Mental noting should be as gentle as a whisper is the mind - such as 'feeling', 'thinking', 'hearing', 'seeing', and 'touching'.",
      "Mental noting should not take the place of being mindful - it is simply a reminder to bring your attention back to the present."
    ],
    activityText:
      "Set a timer for 5 minutes. Close your eyes and breathe. When you notice you attention drifting, gently note it (such as 'oh, thinking' or 'oh, feeling'). After a mental note, gently bring your focus back to the present.",
    observationText: "Great job! What did you notice during the experience?",
    feelingText:
      "Awesome! Now that you've completed the exercise, how do you feel?",
    conclusionText:
      "You can use mental noting throughout your day to help be mindful. When you notice your mind wandering, take a gentle mental note and bring your focus back to the now.",
    premium: false,
    count: 0
  },
  {
    title: "Chronic pain",
    id: "42",
    type: "Anytime",
    description:
      "Our instinct to avert pain creates resistance, and resistance in turn can intensify your pain. You can't avoid what already is. Stop resisting. Sit somewhere comfortable, do a body scan, and focus on your areas of pain. Breathe into the pain, feel it lessen as you focus on it. Accept the pain.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "You can imagine your breath as a healing power. Each breath, focus the healing energy on your pain. Do you notice the pain hurts less when you allow it to just be without judgement or resistance?",
    premium: true,
    count: 0
  },
  {
    title: "World connection",
    id: "43",
    type: "Anytime",
    description:
      "Sit comfortable in a chair and close you eyes. Feel the peaceful energy emanating from your body. Visualize that energy growing to create a 3 foot aura around you. Let it grow further to fill the room you're in. Next, let it fill the building you're in, then the neighborhood. Let it grow to your city, state, country, continenent. Finally let your energy circle the Earth.",
    focusType: "Touch",
    applicableFocusTypes: ["Sight", "Sound", "Touch", "Smell", "Taste"],
    prompt: "What did you feel?",
    hints:
      "You have the power to make a difference in the world if you set your mind to it. This exercise helps us understand the scope of what the can change. After the meditation, use this energy to go out and share your peace with others.",
    premium: true,
    count: 0
  }
];
