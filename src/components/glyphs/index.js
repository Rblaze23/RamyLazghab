import TelecomPlusGlyph from './TelecomPlusGlyph';
import MovieGlyph from './MovieGlyph';
import AlzheimersGlyph from './AlzheimersGlyph';
import RAGeniusGlyph from './RAGeniusGlyph';
import NoSQLGlyph from './NoSQLGlyph';
import OracleGlyph from './OracleGlyph';
import PifGlyph from './PifGlyph';

const GLYPHS = {
  telecomplus: TelecomPlusGlyph,
  nosql: NoSQLGlyph,
  movie: MovieGlyph,
  alzheimers: AlzheimersGlyph,
  ragenius: RAGeniusGlyph,
  // Experience entries. These diagrams stay at the abstraction of the approved
  // copy and must not gain detail; see the note in each glyph file.
  oracle: OracleGlyph,
  'pif-ai': PifGlyph,
};

export const getGlyph = (name) => GLYPHS[name] || null;
