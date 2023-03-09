import { searchResultsView, paginationView } from '../views';

const paginationController = () => {
  searchResultsView.render();
  paginationView.render();
};

export default paginationController;
