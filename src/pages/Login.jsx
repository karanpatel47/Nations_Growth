import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ChevronRight, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

// Shared sx for dark glass input fields
const inputSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(10,15,24,0.5)',
    borderRadius: '16px',
    color: 'white',
    '& fieldset': { borderColor: 'rgba(51,65,85,0.5)' },
    '&:hover fieldset': { borderColor: 'rgba(51,65,85,0.8)' },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(59,130,246,0.5)',
      boxShadow: '0 0 0 4px rgba(59,130,246,0.08)',
    },
  },
  '& .MuiInputBase-input': {
    color: 'white',
    '&::placeholder': { color: '#475569', opacity: 1 },
  },
  // Fix autofill bg
  '& .MuiInputBase-input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px rgba(10,15,24,0.98) inset',
    WebkitTextFillColor: 'white',
  },
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const iconColor = (field) =>
    focusedField === field ? '#60a5fa' : '#64748b';

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden pt-20"
      style={{ backgroundColor: '#0a0f18' }}
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="w-full max-w-[420px] relative z-10">
        {/* Logo & Header */}
        <Stack alignItems="center" spacing={2} className="mb-10">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl p-0.5 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #34d399 100%)',
            }}
          >
            <div
              className="w-full h-full rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#0a0f18' }}
            >
              <ShieldCheck size={32} color="#60a5fa" strokeWidth={1.5} />
            </div>
          </div>

          <div className="text-center">
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: 'white', letterSpacing: '-0.02em', mb: 0.5 }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 300 }}>
              Enter your credentials to access your portal.
            </Typography>
          </div>
        </Stack>

        {/* Glass Card */}
        <Paper
          elevation={0}
          sx={{
            background: 'rgba(15,23,42,0.4)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(51,65,85,0.5)',
            borderRadius: '24px',
            p: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 w-full h-[1px] pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.5) 50%, transparent 100%)',
            }}
          />

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Email Field */}
              <div>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: 'text.secondary',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    mb: 1,
                    pl: 0.5,
                  }}
                >
                  Email Address
                </Typography>
                <TextField
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  sx={inputSx}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail
                            size={20}
                            color={iconColor('email')}
                            style={{ transition: 'color 0.2s' }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1 px-0.5">
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Password
                  </Typography>
                  <Typography
                    component="a"
                    href="#"
                    variant="caption"
                    sx={{
                      color: 'primary.light',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    Forgot it?
                  </Typography>
                </div>
                <TextField
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  sx={{
                    ...inputSx,
                    '& .MuiInputBase-input': {
                      ...inputSx['& .MuiInputBase-input'],
                      letterSpacing: '0.2em',
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock
                            size={20}
                            color={iconColor('password')}
                            style={{ transition: 'color 0.2s' }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                sx={{
                  mt: 1,
                  py: 1.75,
                  borderRadius: '16px',
                  background: 'linear-gradient(90deg, #2563eb 0%, #34d399 100%)',
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textTransform: 'none',
                  gap: 1,
                  boxShadow: '0 4px 24px rgba(37,99,235,0.25)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1d4ed8 0%, #059669 100%)',
                    boxShadow: '0 4px 28px rgba(37,99,235,0.35)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255,255,255,0.45)',
                    background: 'rgba(37,99,235,0.35)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {isLoading ? (
                  <CircularProgress size={22} sx={{ color: 'rgba(255,255,255,0.7)' }} />
                ) : (
                  <>
                    <Fingerprint size={20} />
                    Authenticate
                    <ChevronRight size={16} style={{ opacity: 0.6, marginLeft: 2 }} />
                  </>
                )}
              </Button>
            </Stack>
          </form>
        </Paper>

        {/* Footer link */}
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}
        >
          New to the platform?{' '}
          <Typography
            component={Link}
            to="/signup"
            variant="body2"
            sx={{
              color: 'secondary.main',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: 'secondary.light' },
            }}
          >
            Create an account
          </Typography>
        </Typography>
      </div>
    </div>
  );
};

export default LoginPage;
