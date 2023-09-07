export type QuestsDataType = {
  id: string;
  title: string;
  description: string;
  points: string;
  card_image: string;
  workout_video: string;
  estimated_duration: string;
  tasks_type: string;
  tasks: any;
};

export const QuestsData: Record<string, QuestsDataType> = {
  '1': {
    id: '1',
    title: '5 Min HIIT Workout',
    description: 'Cardio HIIT Workout 40s/20s intervals',
    points: '100',
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
    points: '100',
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
    points: '500',
    card_image: 'https://media.istockphoto.com/id/1225999034/vector/fitness-instructor-service-flat-color-vector-illustration.jpg?s=612x612&w=0&k=20&c=D1PzDVWE5IVVHrYc5yYgLYr8pQpCmdugeZp_BQHhAJA=',
    workout_video: 'https://ncs.jactbb.com/s/9qpHyc68AMj9jB9/download',
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
    title: '4 Min Tabata',
    description: '4 Min Fat Burning Workout',
    points: '100',
    card_image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_07/1676198/tabata-training-te-main-210218.jpg',
    workout_video: 'https://ncs.jactbb.com/s/Ft8xNt3M8P6Jj35/download',
    estimated_duration: '4 mins',
    tasks_type: 'short',
    tasks: [
      ["Rest", 12],
      ["Squats Lateral Walk", 18],
      ["Rest", 8],
      ["Floor Pushups", 18],
      ["Rest", 8],
      ["Crab Toe Touch", 18],
      ["Rest", 8],
      ["Reverse Plank", 18],
      ["Rest", 8],
      ["Lateral Running Floor Touches", 18],
      ["Rest", 8],
      ["Curtsy Lunges", 18],
      ["Rest", 8],
      ["Pogo Squats", 18],
      ["Rest", 8],
      ["Dead Bug", 18],
    ]
  },
  '5': {
    id: '5',
    title: 'Welcome Quest',
    description: 'Description',
    points: '50',
    card_image: 'https://cdn.discordapp.com/attachments/1139833246935433267/1149224142898479135/image.png',
    workout_video: 'https://ncs.jactbb.com/s/NfDqBLCXwKtiGNo/download',
    estimated_duration: '1 min',
    tasks_type: 'short',
    tasks: [
      ["Rest", 5],
      ["Squats", 20],
      ["Rest", 5],
      ["Squats", 20],
    ]
  },
}