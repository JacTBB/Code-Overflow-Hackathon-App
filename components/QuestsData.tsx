export type QuestsDataType = {
  id: string;
  title: string;
  description: string;
  card_image: string;
  workout_video: string;
  estimated_duration: string;
  tasks_type: string;
  tasks: any;
};

export const TaskVideos: Record<string, string> = {
  "Rest": "https://ncs.jactbb.com/s/4nKzwra2LY3KS6X/download",
}

export const QuestsData: Record<string, QuestsDataType> = {
  '1': {
    id: '1',
    title: '5 Min HIIT Workout',
    description: 'Cardio HIIT Workout 40s/20s intervals',
    card_image: 'https://img.livestrong.com/375/media-storage/contentlab-data/7/30/6455cc55a59445658158eeaf2ebf9435.jpg',
    workout_video: 'https://ncs.jactbb.com/s/mFJRSgqDKJYLrYi/download',
    estimated_duration: '5 mins',
    tasks_type: 'short',
    tasks: [
      ["Rest", 3],
      ["Jumping Squat", 38],
      ["Rest", 18],
      ["Frog Jump", 38],
      ["Rest", 18],
      ["Vertical Jump", 38],
      ["Rest", 18],
      ["High Knees", 38],
      ["Rest", 18],
      ["Jumping Jack Plank", 38],
    ]
  },
  '2': {
    id: '2',
    title: '5 Min Tabata',
    description: '5 Min Full Body Workout',
    card_image: 'https://www.pngitem.com/pimgs/m/349-3490656_learn-these-tabata-workout-physical-activity-clipart-hd.png',
    workout_video: 'https://ncs.jactbb.com/s/yF3Pofo6JgDRgDn/download',
    estimated_duration: '5 mins',
    tasks_type: 'short',
    tasks: [
      ["Rest", 12],
      ["Jumping Jacks", 28],
      ["Mountain Climbers", 28],
      ["Squat Side Kick", 28],
      ["Side Jumps", 28],
      ["Push Ups", 28],
      ["Plank Push Ups", 28],
      ["Side Leg Raise (Left)", 28],
      ["Side Leg Raise (Right)", 28],
      ["T Rotation", 28],
      ["Hip Bridge", 28],
    ]
  },
  '3': {
    id: '3',
    title: '10 Min HITT Cardio',
    description: 'HITT Cardio Workout',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    workout_video: '',
    estimated_duration: '10 mins',
    tasks_type: 'short',
    tasks: [
      ["High Knees", 45],
      ["Rest", 15],
      ["Mountain Climbers", 45],
      ["Rest", 15],
      ["Burpees", 45],
      ["Rest", 15],
      ["High Side Plank", 45],
      ["Rest", 15],
      ["Russian Twist", 45],
      ["Rest", 15],
      ["Jumping Lunges", 45],
      ["Rest", 15],
      ["Side To Side Push Up", 45],
      ["Rest", 15],
      ["Jumping Jacks", 45],
      ["Rest", 15],
      ["Ins And Outs", 45],
      ["Rest", 15],
      ["Side To Side Jump Squad", 45],
      ["Rest", 15],
    ]
  },
  '4': {
    id: '4',
    title: 'Quest 4',
    description: 'Description',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    workout_video: '',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["Squats", 100],
      ["Running", 60],
    ]
  },
  '5': {
    id: '5',
    title: 'Quest 5',
    description: 'Description',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    workout_video: '',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["Squats", 100],
      ["Running", 60],
    ]
  },
  '6': {
    id: '6',
    title: 'Quest 6',
    description: 'Description',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    workout_video: '',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["Squats", 100],
      ["Running", 60],
    ]
  },
  '7': {
    id: '7',
    title: 'Quest 7',
    description: 'Description',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    workout_video: '',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["Squats", 100],
      ["Running", 60],
    ]
  },
}