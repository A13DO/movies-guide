
- NEW TASKS
-- responsive #done (expect small fix in details page)
-- fix when delete action message #done
-- add actions and show btns only in SingedIn Mode.
-- use ngDestroy to unsubscribe
-- fix swiper Movie-Details
-- icon toggle change
-- search responsive
-- rating style
-- MAKE ALL LISTS IN THE SAME REALTIME DATABASE
-- card size fix in responsive
##to do list
---- Coming Soon style (like google search)
---- sign in token #done
---- fix add to watched
---- add orderd numbers on top movies


- person-details-page
-- get movie status (watched..etc) #done

- search
-- error page dont reload in second search #done
-- add directed by
-- search from url



- home
-- background hover change #done
-- add loading screen #done
-- authentication #done
-- pagenation #done
-- responsive Movie-Details page #done
-- add rating (progress length = rate )
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








