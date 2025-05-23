import sharp from "sharp"
import {
  DEFAULT_AVATAR_BG_COLOR,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
  AVATAR_FONT_SIZE
} from "../constants/avatarConstants"

function getInitials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return "?"
  const words = trimmed.split(" ").filter(Boolean)
  if (words.length === 1) {
    return Array.from(words[0]).slice(0, 2).join("")
  }
  const initials =
    (Array.from(words[0])[0] || "") + (Array.from(words[1])[0] || "")
  return initials.toUpperCase()
}

export default async function generateAvatar(
  name: string,
  backgroundColor?: string
): Promise<Buffer> {
  const bg = backgroundColor || DEFAULT_AVATAR_BG_COLOR
  const initials = getInitials(name)
  const svg = `
    <svg width='${AVATAR_WIDTH}' height='${AVATAR_HEIGHT}' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}'/>
      <text x='50%' y='50%' text-anchor='middle' dominant-baseline='central' font-family='Arial, sans-serif' font-size='${AVATAR_FONT_SIZE}' fill='black'>${initials}</text>
    </svg>
  `
  const svgBuffer = Buffer.from(svg)
  return sharp(svgBuffer).png().toBuffer()
}

export function normalizeBackgroundColor(
  backgroundColor?: string
): string | undefined {
  if (!backgroundColor) return backgroundColor
  return backgroundColor.startsWith("#")
    ? backgroundColor
    : `#${backgroundColor}`
}
