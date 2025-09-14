import { useTheme } from '../../context/theme-context';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <span className="material-icons-outlined theme-toggle-icon">
        {isDarkMode ? 'dark_mode' : 'light_mode'}
      </span>
      <div className="theme-toggle-track" data-checked={isDarkMode}>
        <div className="theme-toggle-thumb" />
      </div>
    </div>
  );
};