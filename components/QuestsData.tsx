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
    title: 'Quest 1 (Daily)',
    description: 'Description',
    card_image: '(img_url)',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["jumping jacks", 30],
      ["rest", 10],
      ["pushups", 30],
      ["rest", 10],
      ["crunches", 30],
      ["rest", 10],
      ["squats", 30],
      ["rest", 10],
      ["plank", 30],
      ["rest", 10],
      ["high knees", 30],
      ["rest", 10],
      ["lunge right", 30],
      ["rest", 10],
      ["lunges left", 30],
      ["rest", 10],
      ["pushup with rotation", 30],
      ["rest", 10],
      ["squats", 30],
    ]
  },
  '2': {
    id: '2',
    title: 'Quest 2',
    description: 'Description',
    card_image: '(img_url)',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["squats", 30],
      ["high knees", 30],
    ]
  },
  '3': {
    id: '3',
    title: 'Quest 3',
    description: 'Description',
    card_image: '(img_url)',
    estimated_duration: '30 mins',
    tasks_type: 'short',
    tasks: [
      ["squats", 100],
      ["running", 60],
    ]
  },
}