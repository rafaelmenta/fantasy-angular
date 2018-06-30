import { Team } from '../app/services/team.service';
import { Player } from '../app/services/player/player.service';

function flatTeams(league) {
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

function sortPlayers(a: Player, b: Player) {
    if (a.first_name < b.first_name) {
        return -1;
    }

    if (b.first_name < a.first_name) {
        return 1;
    }

    if (a.last_name < b.last_name) {
        return -1;
    }

    if (b.last_name < a.last_name) {
        return 1;
    }

    return 0;

}

function sortAlphabetically(a: Team['team_overview'], b: Team['team_overview']) {
    if (a.city < b.city) {
        return -1;
    }

    if (b.city < a.city) {
        return 1;
    }

    if (a.nickname < b.nickname) {
        return -1;
    }

    if (b.nickname < a.nickname) {
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

export {
    compare,
    flatTeams,
    imageExists,
    sortAlphabetically,
    sortPlayers,
    getAge,
};
