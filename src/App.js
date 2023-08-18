import { Header } from 'components/layout/Header';
import { Progress } from 'components/layout/Progress';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from 'pages/HomePage'
import { PodcastsPage } from 'pages/PodcastsPage';
import { PodcastPage } from 'pages/PodcastPage';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/podcasts' element={<PodcastsPage />} />
        <Route path='/podcasts/:key' element={<PodcastPage />} />
      </Routes>
    </>
  );
};
