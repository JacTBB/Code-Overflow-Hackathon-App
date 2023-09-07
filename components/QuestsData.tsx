export type QuestsDataType = {
  id: string;
  title: string;
  description: string;
  card_image: string;
  estimated_duration: string;
  tasks_type: string;
  tasks: any;
};

export const QuestsData: Record<string, QuestsDataType> = {
  '1': {
    id: '1',
    title: '5 Min HITT Workout',
    description: 'Cardio HIIT Workout 40s/20s intervals https://youtu.be/XGtjACeyHtc?si=56O2-2YO_0_HtrA8',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    estimated_duration: '5 mins',
    tasks_type: 'short',
    tasks: [
      ["jumping squat", 40],
      ["rest", 20],
      ["frog jump", 40],
      ["rest", 20],
      ["vertical jump", 40],
      ["rest", 20],
      ["high knees", 40],
      ["rest", 20],
      ["jumping jack plank", 40],
    ]
  },
  '2': {
    id: '2',
    title: '5 Min Tabata',
    description: '5 Min Full Body Workout https://youtu.be/Tz9d7By2ytQ?si=Hoh26kfB1a8MLhBJ',
    card_image: 'https://www.pngitem.com/pimgs/m/349-3490656_learn-these-tabata-workout-physical-activity-clipart-hd.png',
    estimated_duration: '5 mins',
    tasks_type: 'short',
    tasks: [
      ["squats", 30],
      ["cross back lunge", 30],
      ["superman pushup", 30],
      ["side kick (left)", 30],
      ["side kick (right)", 30],
      ["side plank rotation (right)", 30],
      ["side plank rotation (left)", 30],
      ["leg raise", 30],
      ["bicycle", 30],
      ["toe touch", 30],
    ]
  },
  '3': {
    id: '3',
    title: '10 Min HITT Cardio',
    description: 'HITT Cardio Workout',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    estimated_duration: '10 mins',
    tasks_type: 'short',
    tasks: [
      ["high knees", 45],
      ["rest", 15],
      ["mountain climbers", 45],
      ["rest", 15],
      ["burpees", 45],
      ["rest", 15],
      ["high side plank", 45],
      ["rest", 15],
      ["russian twist", 45],
      ["rest", 15],
      ["jumping lunges", 45],
      ["rest", 15],
      ["side to side push up", 45],
      ["rest", 15],
      ["jumping jacks", 45],
      ["rest", 15],
      ["ins and outs", 45],
      ["rest", 15],
      ["side to side jump squad", 45],
      ["rest", 15],
    ]
  },
  '4': {
    id: '4',
    title: 'Quest 4',
    description: 'Description',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["squats", 100],
      ["running", 60],
    ]
  },
  '5': {
    id: '5',
    title: 'Quest 5',
    description: 'Description',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["squats", 100],
      ["running", 60],
    ]
  },
  '6': {
    id: '6',
    title: 'Quest 6',
    description: 'Description',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["squats", 100],
      ["running", 60],
    ]
  },
  '7': {
    id: '7',
    title: 'Quest 7',
    description: 'Description',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["squats", 100],
      ["running", 60],
    ]
  },
}