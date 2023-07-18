import { Header } from 'components/layout/Header';
import { Progress } from 'components/layout/Progress';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { AboutPage } from 'pages/AboutPage';
import { PostsPage } from 'pages/PostsPage';
import { PostPage } from 'pages/PostPage';
import { MeditationsPage } from 'pages/MeditationsPage';
import { CardsPage } from 'pages/CardsPage';
import { Contacts } from 'components/layout/Contacts';
import { ButtonMain } from 'components/layout/ButtonMain';
import { ModalSlider } from 'components/layout/ModalSlider';
import { PodcastsPage } from 'pages/PodcastsPage';
import { PodcastPage } from 'pages/PodcastPage';

export const App = () => {
  return (
    <>
      <Header />
      <Progress />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/posts/:key' element={<PostPage />} />
        <Route path='/meditations' element={<MeditationsPage />} />
        <Route path='/cards' element={<CardsPage />} />
        <Route path='/podcasts' element={<PodcastsPage />} />
        <Route path='/podcasts/:key' element={<PodcastPage />} />
      </Routes>

      <Contacts />
      <ButtonMain />
      <ModalSlider />
    </>
  );
};
