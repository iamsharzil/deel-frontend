/* eslint-disable react/jsx-props-no-spreading */
import AutoComplete from '@features/Autocomplete';

import SearchInput from '@shared/components/SearchInput';
import Loader from '@shared/components/Loader';
import NotFound from '@shared/components/NotFound';
import ListItem from '@shared/components/ListItem';

import MoviesApi from '@services/apiMovies';

import './App.css';

const filterMovies = (input: string, movies: Movie[]) => [
  ...new Map(movies.map((item) => [item.title.toLowerCase(), item])).values(),
];
const App = () => {
  return (
    <div className="App">
      <h2 className="autocomplete__heading">React Auto Complete</h2>
      <AutoComplete
        loaderComponent={Loader}
        wrapperClass="autocomplete__container"
        apiFunction={MoviesApi.fetchMovies}
        filterFunction={filterMovies}
        optionLabelKey="title"
        renderNoOptions={() => (
          <NotFound
            className="autocomplete__search-result"
            text="Movie not found"
          />
        )}
        renderInput={(props) => (
          <SearchInput
            {...props}
            type="search"
            className="autocomplete__search"
            autoFocus
          />
        )}
        renderList={(props, children) => {
          if (!children) return null;
          return (
            <ul {...props} className="autocomplete__search-results">
              {children}
            </ul>
          );
        }}
        renderListItem={(props) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { data, ...rest } = props;
          const { selected } = rest;
          return (
            <ListItem
              {...rest}
              key={data.id.toString()}
              title={data.title}
              className={`autocomplete__search-result ${
                selected ? 'selected' : ''
              }`}
            />
          );
        }}
      />
    </div>
  );
};

export default App;
