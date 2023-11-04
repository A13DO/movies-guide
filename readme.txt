





##to do list

- person-details-page
-- get movie status (watched..etc)

- search
-- error page dont reload in second search #done
-- add directed by
-- search from url



- home
-- background hover change #done
-- add loading screen #done
-- responsive Movie-Details page
-- add rating (progress length = rate )
-- authentication
-- pagenation
ACCESSABLiTY

LAZY LOADING



## person-details page
-- when click on person (in movie details) name navigate to this name (person-details) also pass id as state param
      this.router.navigate(["/people", person.name], {state: {id: person.id}});
-- (in person-details) get params from url
  - get person-name
    this.route.params.subscribe()
  - get person-id (state param)
    const state = window.history.state;
    const id = state ? state.id : null;
-- get person details use person-id to fetch person details from db api
    - getPersonCredits(person-id).subscribe()
    - getPersonDetails(person-id).subscribe()

    - show person-movies as app-movie-card in HTML and show person-details (person image, biography)
    - use to sort movies by rating
          this.personMovies.sort((a, b) => b.rating - a.rating);








