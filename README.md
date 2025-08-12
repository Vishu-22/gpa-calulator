# GPA Calculator Hub

A comprehensive GPA calculator application with security measures to prevent code copying and unauthorized access.

## Features

### 🔒 Security Features
- **F12 Disabled**: Prevents opening developer tools
- **Right-click Disabled**: Blocks context menu access
- **Copy Protection**: Prevents text/code copying
- **Developer Tools Detection**: Monitors and blocks developer tools
- **Console Disabled**: Blocks console access and methods
- **View Source Disabled**: Prevents viewing page source
- **Print Disabled**: Blocks printing functionality
- **Save Page Disabled**: Prevents page saving

### 📊 Calculator Features
- **CGPA Calculator**: Calculate cumulative GPA from multiple semesters
- **SGPA Calculator**: Calculate semester GPA from internal/external marks
- **Real-time Calculation**: Instant results as you type
- **Grade Point Mapping**: Automatic grade point calculation
- **Letter Grade Display**: Visual grade representation
- **Performance Indicators**: Color-coded performance levels

## Deployment on Vercel

### Prerequisites
- Vercel account
- Git repository with your code

### Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect the static files

3. **Deploy via CLI**:
   ```bash
   cd gpa-calulator
   vercel
   ```

4. **Environment Variables** (if needed):
   - No environment variables required for this static site

### Security Configuration

The deployment includes:
- **Content Security Policy**: Restricts resource loading
- **X-Frame-Options**: Prevents iframe embedding
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Enables XSS protection
- **Permissions Policy**: Restricts browser features

## File Structure

```
gpa-calulator/
├── index.html          # Main hub page
├── home.html           # CGPA calculator
├── sgpa.html           # SGPA calculator
├── security.js         # Security script
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## Security Measures

### Client-Side Protection
- **Keyboard Shortcuts**: F12, Ctrl+Shift+I, Ctrl+U, etc.
- **Mouse Events**: Right-click, drag-and-drop
- **Clipboard**: Copy, cut, paste operations
- **Developer Tools**: Detection and blocking
- **Console**: Disabled console methods

### Server-Side Protection
- **Security Headers**: CSP, X-Frame-Options, etc.
- **Permissions Policy**: Restricts browser APIs
- **Content Type Protection**: Prevents MIME sniffing

## Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## Limitations

⚠️ **Important**: While these security measures provide significant protection, they are not 100% foolproof. Advanced users may still find ways to bypass them. These measures are designed to deter casual copying and protect against common methods.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions:
- Create an issue in the repository
- Contact the maintainer

---

**Note**: This application is designed for educational purposes and follows standard GPA calculation formulas used in academic institutions.
