'use client'

import { LivepeerConfig } from '@livepeer/react'
import {
  getLivepeerClient,
  setFingerprint,
  tapeFont,
  videoPlayerTheme
} from '@tape.xyz/browser'
import { getPublication } from '@tape.xyz/generic'
import type { AnyPublication } from '@tape.xyz/lens'
import type { FC } from 'react'
import React, { useEffect } from 'react'

import Video from './Video'

type Props = {
  publication: AnyPublication
}

const Publication: FC<Props> = ({ publication }) => {
  useEffect(() => {
    setFingerprint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const target = getPublication(publication)

  return (
    <div className={tapeFont.className}>
      <LivepeerConfig client={getLivepeerClient()} theme={videoPlayerTheme}>
        <Video video={target} />
      </LivepeerConfig>
    </div>
  )
}

export default Publication
