import TelecomPlusGlyph from './TelecomPlusGlyph';
import MovieGlyph from './MovieGlyph';
import AlzheimersGlyph from './AlzheimersGlyph';
import RAGeniusGlyph from './RAGeniusGlyph';

const GLYPHS = {
  telecomplus: TelecomPlusGlyph,
  movie: MovieGlyph,
  alzheimers: AlzheimersGlyph,
  ragenius: RAGeniusGlyph,
};

export const getGlyph = (name) => GLYPHS[name] || null;
