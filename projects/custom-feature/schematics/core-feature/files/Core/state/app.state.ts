import { UserEffets } from "src/app/Modules/User/User.Data/User.State/user.effects";
import { UserReducer, UserState } from "src/app/Modules/User/User.Data/User.State/user.reducer";
import { TeamEffets } from "src/app/Modules/Team/Team.Data/Team.State/team.effects";
import { TeamReducer, TeamState } from "src/app/Modules/Team/Team.Data/Team.State/team.reducer";
import { postsState,PostReducer} from "../../Posts/Posts.Data/Posts.State/post.reducer";
import { StatisticReducer, statisticsState } from "../../Satistics/Statistics.Data/Satistics.State/satistics.reducer";
import { SettingsReducer, settingsState } from "../../Settings/Settings.Data/Settings.State/settings.reducer";
import { PostEffets } from "../../Posts/Posts.Data/Posts.State/post.effects";
import { SettingsEffets } from "../../Settings/Settings.Data/Settings.State/settings.effects";
import { StatisticsEffets } from "../../Satistics/Statistics.Data/Satistics.State/satistics.effects";
import { AuthReducer, AuthState } from "../../Auth/Auth.Data/Auth.State/auth.reducer";
import { AuthEffets } from "../../Auth/Auth.Data/Auth.State/auth.effects";
import { MessageReducer, MessageState } from "../../Message/Message.Data/Message.State/message.reducer";
import { MessageEffets } from "../../Message/Message.Data/Message.State/message.effects";


export interface AppState {

userState: UserState,
teamState: TeamState,
      postState:postsState,
       settingsState:settingsState,
       statisticsState:statisticsState,
       authState:AuthState,
       messageState:MessageState,
       
  }
  


export const appReducer ={
userReducer: UserReducer,
teamReducer: TeamReducer,
  messageRed:MessageReducer,
  authReducer: AuthReducer,
  postReducer: PostReducer,
  settingsReducer: SettingsReducer,
  statisticReducer: StatisticReducer
};

export const appEffects = [
UserEffets,
TeamEffets,
 AuthEffets,
                            PostEffets,
                            SettingsEffets,
                            StatisticsEffets,
                            MessageEffets
                          ];