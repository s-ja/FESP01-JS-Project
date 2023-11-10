interface TodoItem {
  _id: number;
  title: string;
  content: string;
  done: true;
  createdAt: string;
  updatedAt: string;
}

interface TodoListResponse {
  ok: number;
  items: TodoItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface TodoResponse {
  ok: number;
  item: TodoItem;
}
