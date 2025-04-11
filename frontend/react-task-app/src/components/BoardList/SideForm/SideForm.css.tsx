import { style } from '@vanilla-extract/css'
import { vars } from '../../../App.css'

export const sideForm = style({
  display: 'flex',
  marginLeft: 'auto',
  alignItems: 'center',
})

export const input = style({
  padding: vars.spacing.medium,
  fontSize: vars.fontSizing.T4,
  marginLeft: 'auto',
})

export const icon = style({
  color: vars.color.brightText,
  fontSize: vars.fontSizing.T2,
  marginLeft: vars.spacing.medium,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
})
