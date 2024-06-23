import { useEffect } from "react"; 

import useSound from "use-sound"; 

import { Icon16MoreVertical, Icon20GraphOutline, Icon24PauseCircle, Icon24PlayCircle } from '@vkontakte/icons';
import { Div, IconButton, Image, Spinner, Text } from "@vkontakte/vkui";

import player from "../store/player";
import audio from "../assets/audio/nbsplv-broken-shutters.mp3"; 
import vkuiImg from "../assets/img/vkui-img.svg"; 
import vkuiImgDark from "../assets/img/vkui-img-dark.svg"; 
import css from "./Player.module.css";
import { observer } from "mobx-react-lite";

const Player = observer(() => {
  const [play, { pause, duration, sound }] = useSound(audio, {
    onend: () => {
      player.setIsPlaying(false);
      player.setTrackIsOn(false);
    }
  });

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      player.setTime({
        min: min,
        sec: secRemain
      });
      player.setIsLoading(false);
    }
  }, [duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        player.setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (player.isPlaying) {
      pause();
      player.setIsPlaying(false);
    } else {
      play();
      player.setIsPlaying(true);
      player.setTrackIsOn(true);
    }
  };

  if (player.isLoading) return (
    <Div className={css.player}>
      <Div className={css.container} onClick={playingButton}>
        <Spinner className={css.loader} size="regular" />
      </Div>
    </Div>
  )

  return (
    <Div className={css.player}>
      <Div className={css.container} onClick={playingButton}>
        {player.isPlaying ? (
          <Div className={css.player__buttons}>
            <IconButton className={css.player__button} aria-label="pause">
              <Icon24PauseCircle />
            </IconButton>
            <IconButton className={`${css.player__button} ${css.player__playingIcon}`} aria-label="playing">
              <Icon20GraphOutline className={css.player__playingIcon} />
            </IconButton>
            <Image size={40} src={vkuiImgDark} alt="vkui-img-playing" /> 
          </Div>
        ) : (
          <Div className={css.player__buttons}>
            <IconButton className={css.player__button} aria-label="play">
              <Icon24PlayCircle />
            </IconButton>
            <Image size={40} src={vkuiImg} alt="vkui-img" /> 
          </Div>
        )}
        <Div className={css.player__track}>
          <Text className={css.track__name}>Broken Shutters</Text>
          <Text className={css.track__artist}>Nbsplv</Text>
        </Div>
        <Div className={css.time}>
          {player.isPlaying || player.trackIsOn ? (
            <Text className={css.time__number}>
              {player.currTime.min}:{player.currTime.sec.toString().length > 1 ? player.currTime.sec : `0${player.currTime.sec}`}
            </Text>
          ) : (
            <Text className={css.time__number}>
              {player.time.min}:{player.time.sec.toString().length > 1 ? player.time.sec : `0${player.time.sec}`}
            </Text>
          )}
          <Div className={css.time__options}>
            <Icon16MoreVertical />
          </Div>
        </Div>
      </Div>
    </Div>
  );
});

export default Player;