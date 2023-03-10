import * as model from '../model';
import { bookmarksView } from '../views';

const loadBookmarkController = () => {
  model.getBookmarksStorage();
  bookmarksView.render();
};

export default loadBookmarkController;
