import { Team } from '../app/services/team.service';
import { Player } from '../app/services/player/player.service';
import { SimulatedPlayer } from '../app/simulator/simulator/simulator.component';

function flatTeams(league): any[] {
    const teams = league.conferences.reduce(function (leagueTeams, conference) {
        const confTeams = conference.divisions.reduce(function (conferenceTeams, division) {

            const divisionTeams = division.teams.map(function (team) {
                team.conference = conference.name;
                team.division = division.name;
                return team;
            });

            conferenceTeams = conferenceTeams.concat(divisionTeams);
            return conferenceTeams;
        }, []);

        return leagueTeams.concat(confTeams);
    }, []);
    return teams;
}

interface PlayerLike {
    first_name: string;
    last_name: string;
}

function sortPlayers(a: PlayerLike, b: PlayerLike) {
    if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
        return -1;
    }

    if (b.first_name.toLowerCase() < a.first_name.toLowerCase()) {
        return 1;
    }

    if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) {
        return -1;
    }

    if (b.last_name.toLowerCase() < a.last_name.toLowerCase()) {
        return 1;
    }

    return 0;

}

interface TeamLike {
    city: string;
    nickname: string;
}

function sortAlphabetically(a: TeamLike, b: TeamLike) {
    if (a.city.toLowerCase() < b.city.toLowerCase()) {
        return -1;
    }

    if (b.city.toLowerCase() < a.city.toLowerCase()) {
        return 1;
    }

    if (a.nickname.toLowerCase() < b.nickname.toLowerCase()) {
        return -1;
    }

    if (b.nickname.toLowerCase() < a.nickname.toLowerCase()) {
        return 1;
    }

    return 0;
}

function compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function getAge(date: string) {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();

    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function imageExists(url: string) {
    const http = new XMLHttpRequest();

    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
}

function getTeamScore(players: SimulatedPlayer[]) {
    const teamMinutes = { PG: 48, SG: 48, SF: 48, PF: 48, C: 48 };

    return players.reduce((score, player) => {

        if (!player || !player.stats || player.stats.length === 0) {
            if (player) {
                player.potential = 0;
            }
            return score;
        }

        const p1 = player.team_info.primary_position;
        const p2 = player.team_info.secondary_position;
        const fps = player.stats[0].fantasy_points;
        const min = player.stats[0].minutes;
        const fpm = fps / min;

        if (!min) {
            player.potential = 0;
            return score;
        }

        if (min < teamMinutes[p1]) {
            teamMinutes[p1] -= min;
            player.potential = 1;
            return score + fps;
        }

        let p1Score = 0;
        let p2Score = 0;
        let remainingMin = min;
        if (min > teamMinutes[p1] && teamMinutes[p1] > 0) {
            p1Score = teamMinutes[p1] * fpm;
            remainingMin -= teamMinutes[p1];
            teamMinutes[p1] = 0;
        }

        if (remainingMin < teamMinutes[p2]) {
            teamMinutes[p2] -= remainingMin;
            player.potential = 1;
            return score + fps;
        }

        if (remainingMin > teamMinutes[p2] && teamMinutes[p2] > 0) {
            p2Score = teamMinutes[p2] * fpm;
            teamMinutes[p2] = 0;
        }

        player.potential = (p1Score + p2Score) / fps;
        return score + p1Score + p2Score;
    }, 0);
}

export {
    compare,
    flatTeams,
    imageExists,
    sortAlphabetically,
    sortPlayers,
    getAge,
    getTeamScore,
};
